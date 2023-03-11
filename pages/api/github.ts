import type { NextApiRequest, NextApiResponse } from "next";
import type { issueInput, commentInput } from "type/github";
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
    githubApi.updateIssue(input);
  }

  if (severReq.body.type === "comment") {
    const input: commentInput = { id: severReq.body.data.id, body: severReq.body.data.body };
    githubApi.updateComment(input);
  }

  severRes.status(200).json({ result: "test" });
}
