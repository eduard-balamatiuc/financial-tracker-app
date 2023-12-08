import { useState } from "react";
import { emailRegex, passwordRegex } from "./assets/constants";

interface SignUpProps {
  changeForm: () => void;
}

function SignUp({ changeForm }: SignUpProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isEmail, setIsEmail] = useState(true);
  const [password, setPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [passwordType, setPasswordType] = useState(false);
  const [signUp, setSignUp] = useState(true);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    if (input.length < 45) {
      setUsername(event.target.value);
    }
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

  const handlePasswordConfirmation = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordsMatch(event.target.value === password);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (passwordType && passwordsMatch && username && isEmail) {
      const newUser = {
        username: username,
        email: email,
        password: password,
      };
      changeForm();
      console.log(newUser);
      setSignUp(true);
    } else {
      setSignUp(false);
    }
  };

  return (
    <div className="login-signup">
      <p className="logo">AISE</p>
      <form onSubmit={handleSubmit}>
        <h1>Sign up</h1>
        <p>Username</p>
        <input type="text" value={username} onChange={handleUsernameChange} />
        <p>Email</p>
        <input type="text" value={email} onChange={handleEmailChange} />
        {!isEmail && <p className="validation not-match">Not a valid email</p>}
        <p>Password</p>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {passwordType ? (
          <p className="validation">Strong password</p>
        ) : (
          <p className="validation">
            {
              "[Password should containd at least 8 characters and include one number, one upper case letter and one special character]"
            }
          </p>
        )}
        <p>Confirm password</p>
        <input type="password" onChange={handlePasswordConfirmation} />
        {!passwordsMatch && (
          <p className="validation not-match">Passwords don't match</p>
        )}
        <button>Sign up</button>
        {!signUp && (
          <p className="validation not-match">Could not create account</p>
        )}
      </form>
    </div>
  );
}

export default SignUp;
