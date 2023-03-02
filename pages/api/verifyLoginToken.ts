import type { NextApiRequest, NextApiResponse } from "next";
import { fetchSet } from "lib/fetch";
import { verifyJtwCookie } from "lib/jwt";

export default async function Auth(
  severReq: NextApiRequest,
  severRes: NextApiResponse
) {
  if (severReq.cookies.loginToken) {
    const { loginToken } = severReq.cookies;
    console.log(1);

    try {
      const { token } = verifyJtwCookie(loginToken);
      const set = fetchSet({
        query: `
              mutation{
                verifyLoginToken(token:"${token}"){
                  name
                  email
                }
              }`,
      });
      const res = await fetch("http://127.0.0.1:4000/graphql", set);
      const data = res.json();
      console.log(data);
      return data.then((json) => {
        console.log(data);
        if (json.data) {
          let user = json.data.verifyLoginToken;
          severRes.status(200).json({ user: user });
        } else {
          severRes.status(200).json({ user: null });
        }
      });
    } catch {
      severRes.status(200).json({ user: null });
    }
  } else {
    severRes.status(200).json({ user: null });
  }
}
