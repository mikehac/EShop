import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoginFormInput } from "../types/loginFormInput";
import { login } from "../utils/service";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const onSubmit = async (data: LoginFormInput) => {
    try {
      const response = await login(data);

      if (!response.ok) {
        throw new Error("Invalid username or password.");
      }

      const responseData = await response.json();
      localStorage.setItem("jwtToken", responseData.token);
      navigate("/orders");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unknown error occurred.");
      }
    }
  };
  return (
    <section id="login">
      <h2>Login</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="email" placeholder="Username" {...register("username", { required: true })} />
        <input type="password" placeholder="Password" {...register("password")} />
        <p>{errors.username && "username is required"}</p>
        <p>{errors.password && "Password is required"}</p>
        <button type="submit">Login</button>
      </form>
      <div className="actions">
        <a href="#">Forgot Password</a>
        <a href="/register">Register</a>
      </div>
    </section>
  );
}
