import axios from "axios";

export async function postLogin(user: { email: string; password: string }, navigate: any) {
  try {
    const response = await fetch(`${process.env.BASE_SERVER_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: user.email, password: user.password }),
    });
    if (!response.ok) {
      throw new Error("Invalid login");
    }

    navigate("/products");
  } catch (error) {
    console.error(error);
  }
}

export function getCart() {
  const api = axios.create({
    baseURL: `${process.env.BASE_SERVER_URL}`,
    withCredentials: true, // Ensures cookies are sent
  });
  return api
    .get("/cart/123-456")
    .then((res) => console.log(res.data))
    .catch((err) => console.error(err));
  // return fetch(`${process.env.BASE_SERVER_URL}/cart/123-456`, {
  //   method: "GET",
  //   credentials: "include",
  // })
  //   .then((res) => res.json())
  //   .then((data) => console.log(data))
  //   .catch((err) => console.error(err));
}

export function httpGet(endpoint: string, id: string = "") {
  const url = id ? `${endpoint}/${id}` : endpoint; // Construct the URL dynamically

  return fetch(`${process.env.BASE_SERVER_URL}/${url}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((resp) => resp.json());
}

export function httpPost(endpoint: string, body: any = null) {
  const url = endpoint; // Construct the URL dynamically

  return fetch(`${process.env.BASE_SERVER_URL}/${url}`, {
    method: "POST",
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((resp) => resp.json());
}
