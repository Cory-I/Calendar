/* Login Page */
import { useNavigate } from "react-router";
import useAuth from "../Auth/AuthContext.jsx";
import { useState } from "react";

export default function LoginPage() {
  const { login, token, getUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  async function handleLogin(formData) {
    setError(null);

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await login(email, password);
      navigate("/Home");
      console.log(token);
    } catch (e) {
      console.error(e);
      setError(e.message);
    }
  }
  return (
    <div>
      <h2>Log In</h2>
      <form action={handleLogin}>
        <p>
          <label>
            Email:
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />
          </label>
        </p>
        <p>
          <label>
            Password:
            <input
              type="password"
              name="password"
              placeholder="Your Password"
              required
            />
          </label>
        </p>
        <button type="submit">Submit</button>
        {error && <p role="alert">{error}</p>}
      </form>
    </div>
  );
}
