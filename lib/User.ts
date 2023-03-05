import { fetchSet } from "lib/fetch";

const graphql: string = "http://127.0.0.1:4000/graphql";

export async function registerUser({ user, token = false }: { user: any; token?: string | false }) {
  let body = {};
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
    console.log(json);

    if (json.data.registerUserByGithub !== null) {
      return json.data.registerUserByGithub.token;
    }
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
    console.log(json);

    if (json.data.registerUserByEmail !== null) {
      return json.data.registerUserByEmail.token;
    }
  }

  return;
}

export async function userLogin({ user }: { user: any }) {
  const body = {
    query: `
      mutation{
        userLogin(email:"${user.email}",password:"${user.password}"){
          token
        }
      }`,
  };
  const set = fetchSet({ body });

  const res = await fetch(graphql, set);
  const json = await res.json();

  if (json.data.userLogin !== null) {
    return json.data.userLogin.token;
  }
  return;
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

  const res = await fetch(graphql, set);
  const json = await res.json();

  if (json.data.verifyLoginToken !== null) {
    return json.data.verifyLoginToken;
  }
  return;
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

  const res = await fetch(graphql, set);
  const json = await res.json();
  console.log(json);
  

  if (json.data.userById !== null) {
    return json.data.userById.github_oauth;
  }
  return;
}
