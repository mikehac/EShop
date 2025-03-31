import { useNavigate } from "react-router-dom";
import { httpPost } from "../utils/service";
import { useRef } from "react";

export function Register() {
  const navigate = useNavigate();
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);

  function handleRegister() {
    // Handle registration logic here
    httpPost("auth/register", {
      username: username.current?.value,
      password: password.current?.value,
    })
      .then((response) => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Registration failed:", error);
      });
  }
  return (
    <section id="register">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label htmlFor="username">UserName</label>
          <input name="username" type="text" placeholder="Username" ref={username} />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input name="password" type="password" placeholder="Password" ref={password} />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input name="confirmPassword" type="password" placeholder="Confirm Password" ref={confirmPassword} />
        </div>
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </section>
  );
}
