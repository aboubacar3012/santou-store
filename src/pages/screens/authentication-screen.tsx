import { useState } from "react";
import LoginComponent from "../components/auth/login";
import RegistrationComponent from "../components/auth/registration";

const AuthenticationScreen = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="flex justify-center items-center h-screen">
      {isLogin ? <LoginComponent /> : <RegistrationComponent />}
    </div>
  );
};

export default AuthenticationScreen;
