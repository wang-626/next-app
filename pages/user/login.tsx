import Link from "next/link";
import { fetchSet } from "lib/fetch";
import * as dotenv from "dotenv";

export default function Header({ href }: { href: String }) {
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const target = event.target as typeof event.target & {
      email: { value: string };
      password: { value: string };
    };
    const body = {
      email: target.email.value,
      password: target.password.value,
    };
    const set = fetchSet({ body });
    try {
      const res = await fetch(`${process.env.SERVER_URL || "http://127.0.0.1:3000"}/api/login`, set);
      const data = await res.json();
      if (data.result) {
        const url = new URL(window.location.href);
        window.location.replace(url.origin);
      } else {
        alert("帳號或密碼錯誤");
      }
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div className="flex h-screen flex-wrap content-center justify-center bg-slate-300">
      <div className="h-80 w-96 bg-white">
        <form onSubmit={handleSubmit}>
          <div className="px-2">
            <label htmlFor="email">email:</label>
            <input type="email" id="email" className="w-full border-b-2 border-sky-500 " />
          </div>
          <div className="px-2">
            <label htmlFor="password">password:</label>
            <input type="password" id="password" className="w-full border-b-2 border-sky-500" />
          </div>
          <div className="flex justify-center px-2">
            <input type="submit" value="Login" className="cursor-pointer" />
          </div>
        </form>
        <div className="flex justify-center px-2">
          <a href={href}>sing in with Github</a>
        </div>
        <div className="flex justify-center px-2">
          <Link href="/user/register">Sign Up</Link>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const scope = "user";
  return {
    props: {
      href: `https://github.com/login/oauth/authorize?scope=${scope}&client_id=${process.env.GITHUB_ID}`,
    },
  };
}
