import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";
import { useState, useEffect } from "react";

type userType = {
  name: string;
  email: string;
  age: number;
};

function Home() {
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const user: userType = {
      name: event.target.name.value,
      email: event.target.email.value,
      age: event.target.age.value,
    };
    const set = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query{
                  name(name:"${user.name}")
        }`,
      }),
    };
    // Fetch data from external API
    try {
      const res = await fetch(`http://127.0.0.1:4000/graphql`, set);
      const data = await res.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      123
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">name:</label>
        <input type="text" id="name" name="name" />
        <label htmlFor="email">email:</label>
        <input type="text" id="email" name="email" />
        <label htmlFor="age">age:</label>
        <input type="text" id="age" name="age" required />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

function test() {
  console.log(123);
}

export async function api(user: userType) {
  const set = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `query{
              name(name:${user.name})
    }`,
    }),
  };
  // Fetch data from external API
  const res = await fetch(`http://127.0.0.1:4000/graphql`, set);
  const data = await res.json();
  console.log(data);

  // Pass data to the page via props
  return { props: { data } };
}

export default Home;
