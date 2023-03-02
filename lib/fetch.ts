export function fetchSet(hash: object) {
  return {
    method: "POST",
    headers: new Headers({
      Accept: "application/json",
      "Content-Type": "application/json",
    }),
    body: JSON.stringify(hash),
  };
}
