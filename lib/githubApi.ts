import * as dotenv from "dotenv";
import { fetchSet } from "lib/fetch";

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
          const sortedEmails = emails.sort((a: object, b: object) => b.primary - a.primary);
          user.email = sortedEmails[0].email;
        }
      }

      return user;
    }
    return;
  }
}
