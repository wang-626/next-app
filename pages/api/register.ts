import { fetchSet } from "lib/fetch";
import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "lib/jwt";


export default async function Auth(
  req: NextApiRequest,
  severRes: NextApiResponse
) {
  let set = fetchSet({
    query: `mutation{
      createUserByEmail(name:"${req.body.name}",email:"${req.body.email}",password:"${req.body.password}"){
      id
      name
      email
    }
  }`,
  });
  try {
    const res = await fetch("http://127.0.0.1:4000/graphql", set);
    let data = await res.json();
    if (data.data.createUserByEmail) {
      const token = setCookie(data.data.createUserByEmail);
      severRes.setHeader("Set-Cookie", `user=${token};Max-Age=86400`);
    }

    severRes.status(200).json({ result: data.data.createUserByEmail });
  } catch (e) {
    console.log(e);
    severRes.status(200).json({ result: false });
  }
}
