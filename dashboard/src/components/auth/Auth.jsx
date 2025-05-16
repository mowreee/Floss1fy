import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./Signup";

export default function Auth({ onLoginSuccess }) {
    const [isLogin, setIsLogin] = useState(true);

    return isLogin ? (
        <Login
            onSwitchToSignUp={() => setIsLogin(false)}
            onLoginSuccess={onLoginSuccess}
        />
    ) : (
        <SignUp onSwitchToLogin={() => setIsLogin(true)} />
    );
}
