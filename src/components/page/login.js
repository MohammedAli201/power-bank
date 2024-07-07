import { useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import "../../assets/styles/Login.css";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const auth = useAuth();

  const handleSubmitEvent = async (e) => {
    e.preventDefault();
    if (input.email && input.password) {
      try {
        await auth.loginAction(input);
      } catch (error) {
        alert("Login failed: " + error.message);
      }
    } else {
      alert("Please provide valid input");
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="login-container">
      <div>
        <h1 className="login-title">Login</h1>
      </div>
      <form onSubmit={handleSubmitEvent} className="login-form">
        <div className="form-control">
          <label htmlFor="user-email">Email:</label>
          <input
            type="email"
            id="user-email"
            name="email"
            placeholder="example@yahoo.com"
            aria-describedby="user-email-help"
            aria-invalid={input.email === "" ? "true" : "false"}
            onChange={handleInput}
          />
          {input.email === "" && (
            <div id="user-email-help" className="error-message">
              Please enter a valid email. It must contain at least 6 characters.
            </div>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            aria-describedby="user-password-help"
            aria-invalid={input.password === "" ? "true" : "false"}
            onChange={handleInput}
          />
          {input.password === "" && (
            <div id="user-password-help" className="error-message">
              Your password should be more than 6 characters.
            </div>
          )}
        </div>
        <button type="submit" className="btn-submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
