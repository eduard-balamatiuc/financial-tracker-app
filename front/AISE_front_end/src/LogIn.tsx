import { useState } from "react";
import { emailRegex, passwordRegex } from "./assets/constants";

interface LogInProps {
    changeForm: () => void,
    hasLogged: () => void
}

function LogIn({changeForm, hasLogged}: LogInProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmail, setIsEmail] = useState(true);
    const [passwordType, setPasswordType] = useState(true);
    const [loggedIn, setLoggedIn] = useState(true);

    const handleNotSignedUp = () => {
        changeForm();
    }

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        if (emailRegex.test(input)) {
            setIsEmail(true);
        } else {
            setIsEmail(false);
        }
        setEmail(input);
    }

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const input = event.target.value;
        if (passwordRegex.test(input)) {
            setPasswordType(true);
        } else {
            setPasswordType(false);
        }
        setPassword(input);
    }

    const handleSubmit = () => {
        if (passwordType && isEmail) {
            const newLoggedUser = {
                "email": email,
                "password": password
            }
            console.log(newLoggedUser);
            hasLogged();
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }

    return (
        <div className="log-in-page">
            <p className="logo">AISE</p>
            <form className="log-in-form" onSubmit={handleSubmit}>
                <p className="log-in-name">Log in</p>
                <p className="log-in-input-name">Email</p>
                <input type="email" value={email} onChange={handleEmailChange}/>
                {!isEmail && <p className="log-in-validation not-match">Not a valid email</p>}
                <p className="log-in-input-name">Password</p>
                <input type="password" value={password} onChange={handlePasswordChange}/>
                {!passwordType && <p className="log-in-validation not-match">Not a valid password</p>}
                <button>Log in</button>
                {!loggedIn && <p className="log-in-validation not-match">Could not log in</p>}
            </form>
            <button onClick={handleNotSignedUp}>Don't have and account.</button>
        </div>
    )
}

export default LogIn;