import { useRouter } from "next/router";
import { useContext } from "react";
import { SessionContext } from "lib/context/session";

export default function Header() {
  const { authenticated, setAuthenticated } = useContext(SessionContext);
  const router = useRouter();
  const status = "";
  function loginRedirect() {
    router.push("user/login");
  }
  function logoutRedirect() {
    router.push("api/logout");
  }
  if (authenticated) {
    return (
      <header>
        {authenticated.email}
        <button
          onClick={() => logoutRedirect()}
          className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
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
      <button
        className="rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
        aria-label="searchBtn"
      >
        Search
      </button>
    </header>
  );
}
