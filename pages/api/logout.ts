import type { NextApiRequest, NextApiResponse } from "next";

export default async function Auth(severReq: NextApiRequest, severRes: NextApiResponse) {
  severRes.setHeader("Set-Cookie", `loginToken=${0};Max-Age=-100`);
  severRes.redirect(307, "/");
}
