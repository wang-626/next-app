import type { NextApiRequest, NextApiResponse } from "next";
import { setJtwCookie } from "lib/jwt";
import { userLogin } from "lib/User";

export default async function Auth(severReq: NextApiRequest, severRes: NextApiResponse) {
  const user = {
    email: severReq.body.email,
    password: severReq.body.password,
  };
  const token = await userLogin({ user });
  if (token) {
    severRes.setHeader("Set-Cookie", `loginToken=${setJtwCookie({ token: token })};Max-Age=86400`);
    severRes.status(200).json({ result: true });
  }

  severRes.status(200).json({ result: false });
}
