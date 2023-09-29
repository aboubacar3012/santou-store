import { useState } from "react";
import LoginComponent from "../components/auth/login";
import RegistrationComponent from "../components/auth/registration";
import CompleteProfileComponent from "../components/auth/complete-profile";

interface Props {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const AuthenticationScreen = ({
  isAuthenticated,
  setIsAuthenticated,
}: Props) => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="flex justify-center  ">
      {isLogin ? (
        <LoginComponent
          setIsAuthenticated={setIsAuthenticated}
          setIsLogin={setIsLogin}
        />
      ) : (
        <RegistrationComponent
          setIsAuthenticated={setIsAuthenticated}
          setIsLogin={setIsLogin}
        />
      )}
    </div>
  );
};

export default AuthenticationScreen;
