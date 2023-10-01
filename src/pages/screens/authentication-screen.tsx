import { useState } from "react";
import LoginComponent from "../components/auth/login";
import RegistrationComponent from "../components/auth/registration";
import CompleteProfileComponent from "../components/auth/complete-profile";

interface Props {
  isAuthenticated: boolean;
}

const AuthenticationScreen = ({ isAuthenticated }: Props) => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="flex justify-center  ">
      {isLogin ? (
        <LoginComponent setIsLogin={setIsLogin} />
      ) : (
        <RegistrationComponent setIsLogin={setIsLogin} />
      )}
    </div>
  );
};

export default AuthenticationScreen;
