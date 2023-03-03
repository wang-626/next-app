import { fetchSet } from "lib/fetch";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "lib/context/auth";

export default function Register() {
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>): Promise<any> {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      name: { value: string };
      email: { value: string };
      password: { value: string };
    };

    const body = {
      name: target.name.value,
      email: target.email.value,
      password: target.password.value,
    };

    const set = fetchSet({ body });

    try {
      const res = await fetch(`${process.env.SERVER_URL || "http://127.0.0.1:3000"}/api/register`, set);
      const json = await res.json();
      if (json.result) {
        const url = new URL(window.location.href);
        window.location.replace(url.origin);
      } else {
        alert("error");
      }
    } catch (e) {
      console.log(e);
    }
  }

  if (authenticated) {
    router.push("/");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="name" name="name" id="name" defaultValue="123456" />

        <label htmlFor="email">Email:</label>
        <input type="email" name="email" id="email" defaultValue="test@gmail.com" />

        <label htmlFor="password">Password:</label>
        <input type="password" name="password" id="password" defaultValue="123456" />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
