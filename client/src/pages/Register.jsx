import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import useAuth from "../Auth/AuthContext";

function RegisterPage() {
  const { token, register, getUser } = useAuth();
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [accountMade, setAccountMade] = useState(false);
  async function handleRegister(formData) {
    setError(null);

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await register(name, email, password);
      setAccountMade(true);
      navigate("/Home");
      console.log(token);
    } catch (e) {
      console.error(e);
      setError(e.message);
    }
  }
  return (
    <div>
      <h2>Create an Account</h2>
      <form action={handleRegister}>
        <p>
          <label>
            Name:
            <input type="text" name="name" placeholder="Your Name" required />
          </label>
        </p>
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
        <button type="submit">Submit & Continue</button>
        {error && <p role="alert">{error}</p>}
      </form>
    </div>
  );
}

export default RegisterPage;
