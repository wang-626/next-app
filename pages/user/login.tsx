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
    <div className="h-body flex flex-wrap content-center justify-center ">
      <div className="w-2/3 rounded-md bg-base-300 px-5 shadow-lg lg:w-1/3">
        <h1 className="py-8 text-center text-4xl font-bold">Sign in</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-control w-full py-3">
            <input type="email" placeholder="Email" id="email" className="input w-full py-3" />
          </div>
          <div className="form-control w-full py-3">
            <input type="password" placeholder="Password" id="password" className="input w-full py-3" />
          </div>
          <div className="flex justify-center py-3">
            <button type="submit" className="btn-primary  btn w-full">
              Sign in
            </button>
          </div>
        </form>
        <div className="divider">OR</div>
        <div className="flex justify-center py-3 ">
          <a className="btn-outline btn-ghost btn w-full" href={href}>
            sing in with Github
          </a>
        </div>
        <div className="mb-3 flex justify-center py-3">
          <Link className="btn-outline btn-ghost btn w-full" href="/user/register">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const scope = "user%20public_repo";
  return {
    props: {
      href: `https://github.com/login/oauth/authorize?scope=${scope}&client_id=${process.env.GITHUB_ID}`,
    },
  };
}
