import { registerUser } from "lib/User";
import type { NextApiRequest, NextApiResponse } from "next";
import { setJtwCookie } from "lib/jwt";
import * as dotenv from "dotenv";

export default async function Auth(req: NextApiRequest, severRes: NextApiResponse) {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  const token: string = await registerUser({ user: user });
  if (token) {
    severRes.setHeader("Set-Cookie", `loginToken=${setJtwCookie({ token: token })};Max-Age=86400`);
    severRes.status(200).json({ result: true });
  }
  severRes.status(200).json({ result: false });
}
