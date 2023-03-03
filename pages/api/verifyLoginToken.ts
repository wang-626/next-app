import type { NextApiRequest, NextApiResponse } from "next";
import { verifyJtwCookie } from "lib/jwt";
import { verifyLoginToken } from "lib/User";

export default async function Auth(severReq: NextApiRequest, severRes: NextApiResponse) {
  if (severReq.cookies.loginToken) {
    const { token } = verifyJtwCookie(severReq.cookies.loginToken);

    if (token) {
      const user = await verifyLoginToken(token);
      severRes.status(200).json({ user: user });
    } else {
      severRes.status(200).json({ user: null });
    }
  }

  severRes.status(200).json({ user: null });
}
