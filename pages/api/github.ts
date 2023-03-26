import type { NextApiRequest, NextApiResponse } from "next";
import type { issueInput, commentInput } from "types/github";
import { fetchUserGithubOauth } from "lib/User";
import { githubFetch } from "lib/githubApi";
import { verifyJtwCookie } from "lib/jwt";
import { verifyLoginToken } from "lib/User";

export default async function Auth(severReq: NextApiRequest, severRes: NextApiResponse) {
  const { token } = verifyJtwCookie(severReq.cookies.loginToken!);
  const user = await verifyLoginToken(token);
  const oauth = await fetchUserGithubOauth(user.id);
  const githubApi = new githubFetch(oauth);

  if (severReq.body.type === "issue") {
    const input: issueInput = { id: severReq.body.data.id };
    if (severReq.body.data.title) {
      input["title"] = severReq.body.data.title;
    }
    if (severReq.body.data.body) {
      input["body"] = severReq.body.data.body;
    }
    if (severReq.body.data.state) {
      input["state"] = severReq.body.data.state;
    }
    await githubApi.updateIssue(input);
  }

  if (severReq.body.type === "issueNew") {
    const id = await githubApi.getRepositoryId(severReq.body.data.repository);

    if (id) {
      const input: issueInput = { id: id };
      if (severReq.body.data.title) {
        input["title"] = severReq.body.data.title;
      }
      if (severReq.body.data.body) {
        input["body"] = severReq.body.data.body;
      }
      await githubApi.createIssue(input);
    }
  }

  if (severReq.body.type === "comment") {
    const input: commentInput = { id: severReq.body.data.id, body: severReq.body.data.body };
    await githubApi.updateComment(input);
  }

  severRes.status(200).json({ result: true });
}
