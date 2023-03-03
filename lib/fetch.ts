export function fetchSet({
  method = "POST",
  header = {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body = null,
}: {
  method?: string;
  header?: HeadersInit;
  body?: object | null;
}) {
  if (body) {
    return {
      method: method,
      headers: new Headers(header),
      body: JSON.stringify(body),
    };
  }
  return {
    method: method,
    headers: new Headers(header),
  };
}
