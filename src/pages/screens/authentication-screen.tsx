import { useState } from "react";


interface Props {
  isAuthenticated: boolean;
}

const AuthenticationScreen = ({ isAuthenticated }: Props) => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="flex justify-center  ">
      {/* {isLogin ? (
        <LoginComponent setIsLogin={setIsLogin} />
      ) : (
        <RegistrationComponent setIsLogin={setIsLogin} />
      )} */}
    </div>
  );
};

export default AuthenticationScreen;
