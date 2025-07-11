import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoginFormInput } from "../types/loginFormInput";
import { login } from "../utils/service";
import { useAppContext } from "../AppContext";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInput>();
  const { setLoggedIn } = useAppContext();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormInput) => {
    try {
      const responseData = await login(data);
      if (responseData.user.role !== "admin") {
        throw new Error("You do not have permission to access this application.");
      }

      localStorage.setItem("jwtToken", responseData.token);
      localStorage.setItem("userRole", responseData.user.role);
      setLoggedIn(true);
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
