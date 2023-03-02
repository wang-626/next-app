export default async function test(req, res) {
  let set2 = {
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "bearer " + "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",
    }),
    method: "POST",
    body: JSON.stringify({
      query: `query{
        viewer { 
          login
          }
        }`,
    }),
  };

  try {
    const res3 = await fetch("https://api.github.com/graphql", set2);
    const data2 = await res3.json();
    console.log(data2);
  } catch (e) {
    console.log(e);
  }
  res.status(200).json({ x: 123 });
}
