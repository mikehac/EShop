import { useNavigate } from "react-router-dom";
import { httpPost } from "../utils/service";
import { useRef, useState } from "react";

export function Register() {
  const navigate = useNavigate();
  const username = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const confirmPassword = useRef<HTMLInputElement>(null);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  function validationEvent(event: any) {
    if (event.target.value !== password.current?.value) {
      setErrorMessage("Passwords do not match");
    } else {
      setErrorMessage("");
    }
  }

  function handleRegister(event: React.FormEvent) {
    event.preventDefault();
    // Handle registration logic here
    httpPost(
      "auth/register",
      {
        username: username.current?.value,
        password: password.current?.value,
      },
      false
    )
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
    <section id="register">
      {!successMessage ? (
        <div className="form-container">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <div>
              <input type="email" placeholder="Username" ref={username} autoComplete="off" required />
            </div>
            <div>
              <input type="password" placeholder="Password" ref={password} autoComplete="new-password" required />
            </div>
            <div>
              <input type="password" placeholder="Confirm Password" ref={confirmPassword} autoComplete="off" onBlur={validationEvent} required />
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <div>
              <button type="submit">Register</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="form-container success-message">
          <h2>The registration completed successfully</h2>
        </div>
      )}
    </section>
  );
}
