import type { NextApiRequest, NextApiResponse } from "next";
import { getToken, githubFetch } from "lib/githubApi";
import { registerUser } from "lib/User";
import { setJtwCookie } from "lib/jwt";
import * as dotenv from "dotenv";

export default async function Auth(severReq: NextApiRequest, severRes: NextApiResponse) {
  if (severReq.query.code) {
    let token = await getToken(severReq.query.code as string);
    if (token) {
      let githubApi = new githubFetch(token);
      let user = await githubApi.getUserInf();
      token = await registerUser({ user: user, token: token });
      severRes.setHeader("Set-Cookie", `loginToken=${setJtwCookie({ token: token })};Max-Age=86400;Path=/api`);
    }
  }
  severRes.redirect(307, process.env.SERVER_URL || "http://127.0.0.1:3000");
}
