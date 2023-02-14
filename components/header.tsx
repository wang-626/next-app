export default function Header() {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };

    const user: userType = {
      email: target.email.value,
      password: target.password.value,
    };

    const set = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: `query{
                  user(email:"${user.email}",password:"${user.password}"){
                    name
                  }
        }`,
      }),
    };

    try {
      const res = await fetch(`http://127.0.0.1:4000/graphql`, set);
      const data = await res.json();
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      header
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">email:</label>
        <input type="text" id="email" name="email" />
        <label htmlFor="password">password</label>
        <input type="text" id="password" name="password" />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
