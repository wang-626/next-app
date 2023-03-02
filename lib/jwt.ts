var jwt = require("jsonwebtoken");
import * as dotenv from "dotenv";
export function setJtwCookie({ token }: { token: string }) {
  let payload = { token: token };
  let jwtToken = jwt.sign(payload, process.env.JWT_KEY, { algorithm: "HS256" });
  return jwtToken;
}

export function verifyJtwCookie(jwtToken: string) {
  console.log("jwt");
  
  try {
    const jwtVerify = jwt.verify(jwtToken, process.env.JWT_KEY);
    return jwtVerify;
  } catch {
    return null;
  }
}
