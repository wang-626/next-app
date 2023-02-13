export default function Header() {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    console.log(target.email);
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
