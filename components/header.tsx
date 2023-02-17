import { log } from "console";
import { signIn, signOut, useSession } from "next-auth/react";
export default function Header() {
  const { data: session, status } = useSession();
  const loading = status === "loading";
  if (status === "authenticated") {
    return (
      <header>
        <button
          onClick={() => signOut()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
        onClick={() => signIn()}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        aria-label="signInBtn"
      >
        Sign in
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        aria-label="searchBtn"
      >
        Search
      </button>
    </header>
  );
}
