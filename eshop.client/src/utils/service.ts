export function postLogin(email: string, password: string) {
  return fetch(`${process.env.BASE_SERVER_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: email, password }),
  }).then((res) => res.json());
}
