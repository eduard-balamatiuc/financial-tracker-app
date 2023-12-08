import { useEffect, useState } from "react";
import { emailRegex, passwordRegex } from "./assets/constants";

interface LogInProps {
  changeForm: () => void;
  hasLogged: () => void;
}

function LogIn({ changeForm, hasLogged }: LogInProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmail, setIsEmail] = useState(true);
  const [passwordType, setPasswordType] = useState(true);
  const [loggedIn, setLoggedIn] = useState(true);

  const handleNotSignedUp = () => {
    changeForm();
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    if (emailRegex.test(input)) {
      setIsEmail(true);
    } else {
      setIsEmail(false);
    }
    setEmail(input);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    if (passwordRegex.test(input)) {
      setPasswordType(true);
    } else {
      setPasswordType(false);
    }
    setPassword(input);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password && email) {
      const newLoggedUser = {
        email: email,
        password: password,
      };
      console.log(newLoggedUser);
      hasLogged();
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  };

  return (
    <div className="login-signup">
      <p className="logo">AISE</p>
      <form onSubmit={handleSubmit}>
        <h1>Log in</h1>
        <p>Email</p>
        <input type="email" value={email} onChange={handleEmailChange} />
        {!isEmail && <p className="validation not-match">Not a valid email</p>}
        <p>Password</p>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {!passwordType && (
          <p className="validation not-match">Not a valid password</p>
        )}
        <button>Log in</button>
        {!loggedIn && <p className="validation not-match">Could not log in</p>}
      </form>
      <button className="no-account" onClick={handleNotSignedUp}>
        Don't have and account.
      </button>
    </div>
  );
}

export default LogIn;
