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

  try {
    const set = fetchSet({ body });
    const githubRes = await fetch(accessTokenUrl, set);
    const json = await githubRes.json();
    return json.access_token;
  } catch {
    return null;
  }
}

export class githubFetch {
  token: string;

  constructor(token: string) {
    this.token = token;
  }

  setHeader() {
    return {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "bearer " + this.token,
    };
  }

  async getUserInf() {
    const body = {
      query: `query{
                viewer {
                  name
                  email
                }
              }`,
    };
    const set = fetchSet({ body, header: this.setHeader() });

    try {
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

        type email = {
          email: string;
          primary: boolean;
        };

        if (emails) {
          // Sort by primary email - the user may have several emails, but only one of them will be primary
          const sortedEmails = emails.sort((a: email, b: email) => Number(b.primary) - Number(a.primary));
          user.email = sortedEmails[0].email;
        }
      }
      return user;
    } catch {
      return null;
    }
  }

  async getRepositories({ after, count }: { after?: string; count: number }) {
    let input = "affiliations:[OWNER]";
    if (after) {
      input += `,after:"${after}"`;
    }
    if (count) {
      input += `,first:${count}`;
    }
    const body = {
      query: `query { 
        viewer { 
          repositories(${input}) {
            nodes{
              name
            }
          }
        }
      }`,
    };
    const set = fetchSet({ body, header: this.setHeader() });

    try {
      const res = await fetch(graphqlUrl, set);
      const json = await res.json();
      return json.data.viewer.repositories.nodes;
    } catch {
      return null;
    }
  }

  async getRepositoryId(name: string) {
    const body = {
      query: `query { 
        viewer { 
          repository(name:"${name}") {
            id
          }
        }
      }`,
    };
    const set = fetchSet({ body, header: this.setHeader() });

    try {
      const res = await fetch(graphqlUrl, set);
      const json = await res.json();
      return json.data.viewer.repository.id;
    } catch {
      return null;
    }
  }

  async getIssues({ repository, state, after }: { repository: string; state: issueStates; after?: string }) {
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
    const set = fetchSet({ body, header: this.setHeader() });

    try {
      const res = await fetch(graphqlUrl, set);
      const json = await res.json();
      return json.data.viewer.repository.issues.nodes;
    } catch {
      return null;
    }
  }
  async getIssue({ repository, number }: { repository: string; number: string }) {
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
    const set = fetchSet({ body, header: this.setHeader() });

    try {
      const res = await fetch(graphqlUrl, set);
      const json = await res.json();
      return json.data.viewer.repository.issue;
    } catch {
      return null;
    }
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
    const set = fetchSet({ body, header: this.setHeader() });

    try {
      const res = await fetch(graphqlUrl, set);
      const json = await res.json();
      return json.data.viewer.repositories.totalCount;
    } catch {
      return null;
    }
  }

  async getRepositoriesPageCursor({ page, count }: { page: number; count: number }) {
    const body = {
      query: `query { 
          viewer { 
            repositories(first: ${count * (page - 1)},affiliations:[OWNER]){
              pageInfo {
                endCursor
              }
            }
          }
        }`,
    };
    const set = fetchSet({ body, header: this.setHeader() });

    try {
      const res = await fetch(graphqlUrl, set);
      const json = await res.json();
      return json.data.viewer.repositories.pageInfo.endCursor;
    } catch {
      return null;
    }
  }

  async getIssueCount({ repository, state }: { repository: string; state: issueStates }) {
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
    const set = fetchSet({ body, header: this.setHeader() });

    try {
      const res = await fetch(graphqlUrl, set);
      const json = await res.json();
      return json.data.viewer.repository.issues.totalCount;
    } catch {
      return null;
    }
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
    const set = fetchSet({ body, header: this.setHeader() });

    try {
      const res = await fetch(graphqlUrl, set);
      const json = await res.json();
      return json.data.viewer.repository.issues.pageInfo.endCursor;
    } catch {
      return null;
    }
  }

  async updateIssue(input: issueInput) {
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
    const set = fetchSet({ body, header: this.setHeader() });
    try {
      const res = await fetch(graphqlUrl, set);
      const json = await res.json();
      return json.data.updateIssue.actor.login;
    } catch {
      return null;
    }
  }

  async updateComment(input: commentInput) {
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
    const set = fetchSet({ body, header: this.setHeader() });

    try {
      const res = await fetch(graphqlUrl, set);
      const json = await res.json();
      return json.data.updateIssueComment.issueComment.author.login;
    } catch {
      return null;
    }
  }

  async createIssue(input: issueInput) {
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
    const set = fetchSet({ body, header: this.setHeader() });

    try {
      const res = await fetch(graphqlUrl, set);
      const json = await res.json();
      return json.data.createIssue.issue.id;
    } catch {
      return null;
    }
  }
}
