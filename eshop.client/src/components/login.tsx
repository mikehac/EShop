import { useForm } from "react-hook-form";
// import { getCart, postLogin } from "../utils/service";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type LoginFormInputs = {
  username: string;
  password: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const navigate = useNavigate();
  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await fetch(`${process.env.BASE_SERVER_URL}/auth/login`, {
        method: "POST",
        credentials: "include", // Ensures the JWT cookie is stored
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Invalid username or password.");
      }

      navigate("/products"); // Redirect to main page after successful login
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
        <p>{errors.email && "Email is required"}</p>
        <p>{errors.password && "Password is required"}</p>
        <button type="submit">Login</button>
      </form>
    </section>
  );
}
