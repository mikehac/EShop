import { useNavigate } from "react-router-dom";
import { httpPost } from "../utils/service";
import { useRef, useState } from "react";

export function Register() {
  const navigate = useNavigate();
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  // State to manage success message visibility
  const [successMessage, setSuccessMessage] = useState(false);

  function handleRegister(event: React.FormEvent) {
    event.preventDefault();
    // Handle registration logic here
    httpPost("auth/register", {
      username: username.current?.value,
      password: password.current?.value,
    })
      .then((response) => {
        setSuccessMessage(true); // Show success message
        setTimeout(() => {
          navigate("/");
        }, 3000);
      })
      .catch((error) => {
        console.error("Registration failed:", error);
      });
  }
  return (
    <>
      {!successMessage && (
        <section id="register">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <div>
              <input type="text" placeholder="Username" ref={username} autoComplete="off" />
            </div>
            <div>
              <input type="password" placeholder="Password" ref={password} autoComplete="new-password" />
            </div>
            <div>
              <input type="password" placeholder="Confirm Password" ref={confirmPassword} autoComplete="off" />
            </div>
            <div>
              <button type="submit">Register</button>
            </div>
          </form>
        </section>
      )}
      {/* Success message */}
      {successMessage && <div className="success-message">The registration completed successfully</div>}
    </>
  );
}
