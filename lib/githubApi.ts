import * as dotenv from "dotenv";
import { fetchSet } from "lib/fetch";
import type { issueInput, commentInput, issueStates } from "types/github";

const accessTokenUrl: string = "https://github.com/login/oauth/access_token";
const graphqlUrl: string = "https://api.github.com/graphql";
const restfulEmailUrl: string = "https://api.github.com/user/emails";

export async function getToken(code: string) {
  const body = {
    client_id: process.env.GITHUB_ID,
    client_secret: process.env.GITHUB_SECRET,
    code: code,
  };
  const set = fetchSet({ body });
  const githubRes = await fetch(accessTokenUrl, set);
  const json = await githubRes.json();

  if (json) {
    return json.access_token;
  }
}

export class githubFetch {
  token: string | null;

  constructor(token: string) {
    this.token = token || null;
  }

  setHeader() {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "bearer " + this.token,
    };
  }

  async getUserInf() {
    if (this.token) {
      const body = {
        query: `query{
                  viewer {
                    name
                    email
                  }
                }`,
      };
      const header = this.setHeader();

      const set = fetchSet({ body, header });
      const res = await fetch(graphqlUrl, set);
      const json = await res.json();

      let user = json.data.viewer;

      if (user.email === "") {
        const header = {
          Authorization: `token ${this.token}`,
        };
        const set = fetchSet({ header, method: "GET" });
        const res = await fetch(restfulEmailUrl, set);
        const emails = await res.json();

        if (emails) {
          // Sort by primary email - the user may have several emails, but only one of them will be primary
          const sortedEmails = emails.sort((a: any, b: any) => b.primary - a.primary);
          user.email = sortedEmails[0].email;
        }
      }

      return user;
    }
    return;
  }

  async getRepositories() {
    if (this.token) {
      const body = {
        query: `query { 
          viewer { 
            repositories(affiliations:[OWNER],first:10) {
              nodes{
                name
              }
            }
          }
        }`,
      };
      const header = this.setHeader();

      const set = fetchSet({ body, header });
      const res = await fetch(graphqlUrl, set);
      const json = await res.json();

      let repositories = json.data.viewer.repositories.nodes;
      if (repositories) {
        return repositories;
      }
      return;
    }
    return;
  }

  async getRepositoryId(name: string) {
    try {
      const body = {
        query: `query { 
          viewer { 
            repository(name:"${name}") {
              id
            }
          }
        }`,
      };
      const header = this.setHeader();

      const set = fetchSet({ body, header });
      const res = await fetch(graphqlUrl, set);
      const json = await res.json();
      return json.data.viewer.repository.id;
    } catch {
      return null;
    }
  }

  async getIssues({ repository, state, after }: { repository: string; state: issueStates; after?: string }) {
    try {
      let input = `first:10,states:${state}`;
      if (after) {
        input += `,after:"${after}"`;
      }

      const body = {
        query: `query { 
          viewer { 
            repository(name:"${repository}"){
              issues(${input}) {
                nodes {
                  id
                  number
                  title
                  body
                }
              }
            }
          }
        }`,
      };

      const header = this.setHeader();
      const set = fetchSet({ body, header });
      const res = await fetch(graphqlUrl, set);
      const json = await res.json();

      return json.data.viewer.repository.issues.nodes;
    } catch {
      return null;
    }
  }
  async getIssue({ repository, number }: { repository: string; number: string }) {
    if (this.token) {
      const body = {
        query: `query { 
          viewer { 
            repository(name:"${repository}"){
              issue(number:${number}) {
                author{
                  login
                }
               id
               title
               number
               body
                comments(first:10){
                  nodes{
                    author{
                      login
                    }
                    id
                    databaseId
                    body
                  }
                }
              }
            }
          }
        }`,
      };
      try {
        const header = this.setHeader();
        const set = fetchSet({ body, header });
        const res = await fetch(graphqlUrl, set);
        const json = await res.json();
        return json.data.viewer.repository.issue;
      } catch {
        return null;
      }
    }
    return null;
  }

  async getRepositoriesCount() {
    const body = {
      query: `query { 
          viewer { 
            repositories(affiliations:[OWNER]){
              totalCount
            }
          }
        }`,
    };
    try {
      const header = this.setHeader();
      const set = fetchSet({ body, header });
      const res = await fetch(graphqlUrl, set);
      const json = await res.json();

      return json.data.viewer.repository.issues.totalCount;
    } catch {
      return null;
    }
  }

  async getIssueCount({ repository, state }: { repository: string; state: issueStates }) {
    if (this.token) {
      const body = {
        query: `query { 
          viewer {
            repository(name: "${repository}") {
              issues(states: ${state}) {
                totalCount
              }
            }
          }
        }`,
      };
      try {
        const header = this.setHeader();
        const set = fetchSet({ body, header });
        const res = await fetch(graphqlUrl, set);
        const json = await res.json();

        return json.data.viewer.repository.issues.totalCount;
      } catch {
        return null;
      }
    }
    return null;
  }

  async getIssuePageCursor({
    repository,
    page,
    count,
    state,
  }: {
    repository: string;
    page: number;
    count: number;
    state: issueStates;
  }) {
    try {
      const body = {
        query: `query{
          viewer{
            repository(name:"${repository}") {
              issues(first: ${count * (page - 1)},states:${state}) {
                pageInfo {
                  endCursor
                }
              }
            }
          }
        }`,
      };
      const header = this.setHeader();
      const set = fetchSet({ body, header });
      const res = await fetch(graphqlUrl, set);
      const json = await res.json();

      return json.data.viewer.repository.issues.pageInfo.endCursor;
    } catch {
      return null;
    }
  }

  async updateIssue(input: issueInput) {
    if (this.token) {
      let issueInput = `id:"${input.id}"`;
      if (input.title) {
        issueInput += `,title:"${input.title}"`;
      }
      if (input.body) {
        issueInput += `,body:"${input.body}"`;
      }
      if (input.state) {
        issueInput += `,state:${input.state}`;
      }

      const body = {
        query: `mutation { 
          updateIssue(input:{${issueInput}}){
            actor{
              login
            }
          }
        }`,
      };
      const header = this.setHeader();
      const set = fetchSet({ body, header });
      const res = await fetch(graphqlUrl, set);
      const json = await res.json();
      const issue = json.data.updateIssue.actor.login;
      if (issue) {
        return issue;
      }
      return;
    }
    return;
  }

  async updateComment(input: commentInput) {
    if (this.token) {
      const commentInput = `id:"${input.id}",body:"${input.body}"`;

      const body = {
        query: `mutation { 
          updateIssueComment(input:{${commentInput}}){
            issueComment{
              author{
                login
              }
            }
          }
        }`,
      };
      const header = this.setHeader();
      const set = fetchSet({ body, header });
      const res = await fetch(graphqlUrl, set);
      const json = await res.json();

      const issue = json.data.updateIssueComment.issueComment.author.login;
      if (issue) {
        return issue;
      }
      return;
    }
    return;
  }

  async createIssue(input: issueInput) {
    try {
      let issueInput = `repositoryId:"${input.id}",title:"${input.title}",body:"${input.body}"`;
      const body = {
        query: `mutation { 
          createIssue(input:{${issueInput}}){
            issue{
              id
            }
          }
        }`,
      };
      const header = this.setHeader();
      const set = fetchSet({ body, header });
      const res = await fetch(graphqlUrl, set);
      const json = await res.json();
      return json.data.createIssue.issue.id;
    } catch {
      return null;
    }
  }
}
