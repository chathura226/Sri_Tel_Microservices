import { useState } from "react";
import { useSignup } from "../hooks/useSignup";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [answer, setAnswer] = useState("");
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const { signup, isLoading, error } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(
      firstName,
      lastName,
      email,
      password,
      answer,
      securityQuestion,
      mobileNumber
    ); //norml user signup
  };
  return (
    <div className="form-container">
      <form className="login" onSubmit={handleSubmit}>
        <h3>SignUp</h3>
        <label>First Name:</label>
        <input
          type="text"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />
        <label>Last Name:</label>
        <input
          type="text"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />

        <label>Mobile Number:</label>
        <input
          type="text"
          onChange={(e) => setMobileNumber(e.target.value)}
          value={mobileNumber}
        />
        <label>Security Question:</label>
        <input
          type="text"
          onChange={(e) => setSecurityQuestion(e.target.value)}
          value={securityQuestion}
        />
        <label>Answer:</label>
        <input
          type="text"
          onChange={(e) => setAnswer(e.target.value)}
          value={answer}
        />

        <label>Email:</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button disabled={isLoading}>SignUp</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Signup;
