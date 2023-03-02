import { fetchSet } from "lib/fetch";
import { useRouter } from "next/router";
import { useContext } from "react";
import { AuthContext } from "lib/context/auth";

export default function Register() {
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): Promise<any> {
    event.preventDefault();

    const target = event.target as typeof event.target & {
      name: { value: string };
      email: { value: string };
      password: { value: string };
    };

    const set = fetchSet({
      name: target.name.value,
      email: target.email.value,
      password: target.password.value,
    });

    try {
      const res = await fetch("http://127.0.0.1:3000/api/register", set);
      const data = res.json();
      data.then((json) => {
        console.log(json);
      });
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
        <input
          type="email"
          name="email"
          id="email"
          defaultValue="test@gmail.com"
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          id="password"
          defaultValue="123456"
        />

        <button type="submit">Submit</button>
      </form>
    </>
  );
}
