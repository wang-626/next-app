import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "lib/context/auth";
import Link from "next/link";

export default function Header() {
  const { authenticated } = useContext(AuthContext);
  const router = useRouter();

  function loginRedirect() {
    router.push("/user/login");
  }

  function signUpRedirect() {
    router.push("/user/register");
  }

  function logoutRedirect() {
    router.push("/api/logout");
  }

  if (authenticated) {
    return (
      <header className=" h-16  bg-accent py-2">
        <div className="container mx-auto flex flex-wrap content-center justify-between">
          <Link href="/" className="my-auto text-xl text-primary">
            首頁
          </Link>
          <div className="flex">
            <p className="my-auto text-accent-content">{authenticated.email}</p>
            <button onClick={() => logoutRedirect()} className="btn mx-3" aria-label="signOutBtn">
              Sign out
            </button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className=" h-16  bg-accent py-2">
      <div className="container mx-auto flex flex-wrap content-center justify-between">
        <Link href="/" className="my-auto text-xl text-primary">
          首頁
        </Link>
        <div>
          <button onClick={() => loginRedirect()} className="btn-primary btn mx-3" aria-label="signInBtn">
            Sign in
          </button>
          <button onClick={() => signUpRedirect()} className="btn-secondary btn mx-3" aria-label="signInBtn">
            Sign up
          </button>
        </div>
      </div>
    </header>
  );
}
