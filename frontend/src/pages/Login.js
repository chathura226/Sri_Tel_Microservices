import { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, error, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    // console.log("error: ",error)
    // if(login && error==null) window.location.href = "/"
  };

  return (
    <div className="form-container">
      <form className="login" onSubmit={handleSubmit}>
        <h3>Login</h3>
        <label>Email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button disabled={isLoading}>Log In</button>
        <Link to="/forgot-password">
          <span style={{ color: "red" }}>Forgot Password?</span>
        </Link>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Login;
