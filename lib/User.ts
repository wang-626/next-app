import { fetchSet } from "lib/fetch";
import * as dotenv from "dotenv";

const graphql: string = process.env.BACK_SERVER_URL + "/graphql" || "http://127.0.0.1:4000/graphql";

type user = {
  name: string;
  email: string;
  password: string;
};

type Login = {
  email: string;
  password: string;
};

export async function registerUser({ user, token = false }: { user: user; token?: string | false }) {
  let body = {};
  try {
    if (token) {
      body = {
        query: `
                mutation{
                  registerUserByGithub(email:"${user.email}",name:"${user.name}",github_oauth:"${token}"){
                    token
                  }
                }`,
      };
      const set = fetchSet({ body });

      const res = await fetch(graphql, set);
      const json = await res.json();
      return json.data.registerUserByGithub.token;
    } else {
      body = {
        query: `mutation{
          registerUserByEmail(name:"${user.name}",email:"${user.email}",password:"${user.password}"){
            token
        }
      }`,
      };
      const set = fetchSet({ body });

      const res = await fetch(graphql, set);
      const json = await res.json();
      return json.data.registerUserByEmail.token;
    }
  } catch {
    return null;
  }
}

export async function userLogin({ user }: { user: Login }) {
  const body = {
    query: `
      mutation{
        userLogin(email:"${user.email}",password:"${user.password}"){
          token
        }
      }`,
  };
  const set = fetchSet({ body });

  try {
    const res = await fetch(graphql, set);
    const json = await res.json();
    return json.data.userLogin.token;
  } catch {
    return null;
  }
}

export async function verifyLoginToken(token: string) {
  const body = {
    query: `
    mutation{
      verifyLoginToken(token:"${token}"){
        name
        email
        id
      }
    }`,
  };
  const set = fetchSet({ body });

  try {
    const res = await fetch(graphql, set);
    const json = await res.json();
    return json.data.verifyLoginToken;
  } catch {
    return null;
  }
}

export async function fetchUserGithubOauth(id: string) {
  const body = {
    query: `
    query{
      userById(id:"${id}"){
        github_oauth
      }
    }`,
  };
  const set = fetchSet({ body });

  try {
    const res = await fetch(graphql, set);
    const json = await res.json();
    return json.data.userById.github_oauth;
  } catch {
    return null;
  }
}
