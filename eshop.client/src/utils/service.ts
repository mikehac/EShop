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
export async function fetchCategories() {
  return fetch(`${process.env.BASE_SERVER_URL}/category`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((resp) => resp.json());
}
