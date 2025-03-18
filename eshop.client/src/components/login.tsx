import { useForm } from "react-hook-form";
import { postLogin } from "../utils/service";
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <section id="login">
      <h2>Login</h2>
      <form
        onSubmit={handleSubmit(async (data) => {
          const token = (await postLogin(data.email, data.password)).access_token;
          console.log(token);
        })}
      >
        {/* <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Password" required /> */}
        <input type="email" placeholder="Email" {...register("email")} />
        <input type="password" placeholder="Password" {...register("password")} />
        <p>{errors.email && "Email is required"}</p>
        <p>{errors.password && "Password is required"}</p>
        <button type="submit">Login</button>
      </form>
    </section>
  );
}
