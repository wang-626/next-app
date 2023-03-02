import { fetchSet } from "lib/fetch";
import * as dotenv from "dotenv";

export default async function Auth(req, res) {
  console.log(req.body);

  // let set = fetchSet({
  //   client_id: process.env.GITHUB_ID,
  //   client_secret: process.env.GITHUB_SECRET,
  //   code: req.query.code,
  // });
  // let set2 = {};
  // try {
  //   const res2 = await fetch(
  //     "https://github.com/login/oauth/access_token",
  //     set
  //   );
  //   const data = await res2.json();
  //   console.log(data);
  // } catch (e) {
  //   console.log(e);
  // }

  res.status(200).json({ result: 123 });
}
