import type { NextApiRequest, NextApiResponse } from "next";
import { fetchSet } from "lib/fetch";
import { setJtwCookie } from "lib/jwt";

export default async function Auth(
  severReq: NextApiRequest,
  severRes: NextApiResponse
) {
  const set = fetchSet({
    query: `
      mutation{
        userLogin(email:"${severReq.body.email}",password:"${severReq.body.password}"){
          token
        }
      }`,
  });
  try {
    const res = await fetch("http://127.0.0.1:4000/graphql", set);
    const data = res.json();
    data.then((json) => {
      console.log(json);
      if (json.data.userLogin) {
        const token: string = json.data.userLogin.token;
        const loginCookie = setJtwCookie({ token: token });
        severRes.setHeader("Set-Cookie", `loginToken=${loginCookie};Max-Age=86400`);
        severRes.status(200).json({ result: true });
      } else {
        severRes.status(200).json({ result: false });
      }
    });
  } catch (e) {
    // console.log(e);
    severRes.status(200).json({ result: false });
  }
}
