import Head from "next/head";
import Layout from "components/layout";
import utilStyles from "../styles/utils.module.css";
import { createContext } from "react";
import Header from "components/header";
import NextAuth from "pages/api/auth/[...nextauth]";
import { headers } from "next/headers";

function Home({ x }) {
  return (
    <div className="flex">
      <Header />
      {Object.keys(x).map(function (objectKey, index) {
        let value = x[objectKey];
        let s = `${objectKey}--${value}`;
        return <div>{s}</div>;
      })}
    </div>
  );
}

export default Home;

export async function getServerSideProps({ req }) {
  return { props: { x: req.headers } };
}
