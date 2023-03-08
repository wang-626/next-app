import type { NextApiRequest, NextApiResponse } from "next";
import { fetchSet } from "lib/fetch";
import * as dotenv from "dotenv";
import { fetchUserGithubOauth } from "lib/User";
import { githubFetch } from "lib/githubApi";

export default async function Auth(severReq: NextApiRequest, severRes: NextApiResponse) {
  // const url = "https://api.github.com/applications/ef7db3b7081b621d1300/token";
  // const body = {
  //   access_token: "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",
  // };
  // const header = {
  //   Accept: "application/vnd.github+json",
  //   Authorization: "Bearer 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",
  // };
  // let set = fetchSet({ body, header });
  // const res = await fetch(url, set);
  // const data = await res.json();
  // severRes.status(200).json({ data: data });
  // const graphqlUrl: string = "https://api.github.com/graphql";
  // const header = {
  //   Accept: "application/json",
  //   "Content-Type": "application/json",
  //   Authorization: "bearer " + "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",
  // };
  // const body = {
  //   query: `query{
  //             viewer {
  //               name
  //               email
  //             }
  //           }`,
  // };
  // const set = fetchSet({ body, header });
  // const res = await fetch(graphqlUrl, set);
  // const data = await res.json();
  // severRes.status(200).json({ data: data });
  const data = "c55b7c1f-19e9-450b-a4b9-97460a268f53";
  const oauth = await fetchUserGithubOauth(data);
  const githubApi = new githubFetch(oauth);
  const repositories = await githubApi.getRepositories();
  console.log(repositories);
  severRes.status(200).json({ data: repositories });
}
