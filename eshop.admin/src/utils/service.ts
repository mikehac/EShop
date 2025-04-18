//TODO: Check the posibility to export this functionality to project package, so it could be used in eshop.front and eshop.admin
import { LoginFormInput } from "../types/loginFormInput";

function getHeader() {
  let headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  const token = localStorage.getItem("jwtToken");
  if (token) {
    headers = { ...headers, Authorization: `Bearer ${token}` };
  }

  return headers;
}
export function httpGet(endpoint: string, id: string = "", searchTerm: string = "") {
  const url = id ? `${endpoint}/${id}` : searchTerm ? `${endpoint}/?searchTerm=${searchTerm}` : endpoint;
  let headers = getHeader();
  return fetch(`${process.env.BASE_SERVER_URL}/${url}`, {
    method: "GET",
    credentials: "include",
    headers,
  }).then((resp) => resp.json());
}

export function httpPost(endpoint: string, body: any = null) {
  const url = endpoint; // Construct the URL dynamically
  let headers = getHeader();
  return fetch(`${process.env.BASE_SERVER_URL}/${url}`, {
    method: "POST",
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
    headers,
  }).then((resp) => resp.json());
}

export function httpPut(endpoint: string, body: any = null) {
  const url = endpoint; // Construct the URL dynamically

  return fetch(`${process.env.BASE_SERVER_URL}/${url}`, {
    method: "PUT",
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((resp) => resp.json());
}

export function checkLogin() {
  let headers = getHeader();

  return fetch(`${process.env.BASE_LOGIN_URL}/auth/check-auth`, {
    method: "GET",
    credentials: "include", // Ensures the cookie is sent
    headers,
  });
}

export async function login(login: LoginFormInput) {
  const response = await fetch(`${process.env.BASE_LOGIN_URL}/auth/login`, {
    method: "POST",
    credentials: "include", // Ensures the JWT cookie is stored
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(login),
  });
  if (!response.ok) {
    throw new Error("Invalid username or password.");
  }

  return response.json();
}
export function logout() {
  let headers = getHeader();

  return fetch(`${process.env.BASE_LOGIN_URL}/auth/logout`, {
    method: "POST",
    credentials: "include", // Ensures the cookie is sent
    headers,
  });
}

export function getMe() {
  let headers = getHeader();

  return fetch(`${process.env.BASE_LOGIN_URL}/auth/me`, {
    method: "GET",
    credentials: "include", // Ensures the cookie is sent
    headers,
  });
}
