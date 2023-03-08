import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "lib/context/auth";

export default function Header() {
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const router = useRouter();
  const status = "";

  function loginRedirect() {
    router.push("//user/login");
  }

  function logoutRedirect() {
    router.push("//api/logout");
  }

  if (authenticated) {
    return (
      <header className="flex flex-wrap content-center justify-end py-1">
        <p className="my-auto">{authenticated.email}</p>
        <button
          onClick={() => logoutRedirect()}
          className="btn"
          aria-label="signOutBtn"
        >
          Sign out
        </button>
      </header>
    );
  }

  return (
    <header>
      <button
        onClick={() => loginRedirect()}
        className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        aria-label="signInBtn"
      >
        Sign in
      </button>
      <button className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700" aria-label="searchBtn">
        Search
      </button>
    </header>
  );
}
