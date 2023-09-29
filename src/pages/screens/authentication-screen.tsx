import { useState } from "react";
import LoginComponent from "../components/auth/login";
import RegistrationComponent from "../components/auth/registration";
import CompleteProfileComponent from "../components/auth/complete-profile";

const AuthenticationScreen = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="flex justify-center  ">
      {isLogin ? (
        <LoginComponent setIsLogin={setIsLogin} />
      ) : (
        <RegistrationComponent setIsLogin={setIsLogin} />
      )}
      {/* <CompleteProfileComponent /> */}
    </div>
  );
};

export default AuthenticationScreen;
