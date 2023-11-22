import { loginService } from "@/services/auth";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/redux/features/authSlice";
import { setSafeArea } from "@/utils/fixStatusBarHeight";
import NotificationMessage from "@/components/shared/notification-message";
import { useRouter } from "next/router";
import { RootState } from "@/redux/store";
import { addUserId } from "@/redux/features/cartSlice";

// interface RegistrationProps {
//   setIsLogin: (value: boolean) => void;
// }

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>("");
  const auth = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    setSafeArea();
  }, []);

  useEffect(() => {
    if (auth.isAuthenticated) {
      router.push("/screens/home-screen");
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isAuthenticated]);

  // Mutations
  const mutation = useMutation(
    (loginInfo: { email: string; password: string }) => loginService(loginInfo),
    {
      onSuccess: (data: any) => {
        if (data.success) {
          dispatch(
            login({ isAuthenticated: true, user: data.user, token: data.token })
          );
          dispatch(addUserId(data.user.id));
          router.push("/screens/home-screen");
          // setMessage(data.message);
        } else {
          // alert("Email ou mot de passe incorrect");
          setMessage("Email ou mot de passe incorrect");
        }
      },
      onError: (error) => {
        // alert(error);
        setMessage("Email ou mot de passe incorrect");
      },
    }
  );

  const handleValidInfo = () => {
    if (!email || !password) {
      // alert("Veuillez remplir tous les champs");
      setMessage("Veuillez remplir tous les champs");
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      // alert("Adresse email invalide");
      setMessage("Adresse email invalide");
      return false;
    }

    if (password.length < 8) {
      // alert("Le mot de passe doit contenir au moins 8 caractères");
      setMessage("Le mot de passe doit contenir au moins 8 caractères");
      return false;
    }
    return true;
  };

  const handleLogin = () => {
    if (!handleValidInfo()) return;
    mutation.mutate({ email, password });
    // dispatch(
    //   login({
    //     isAuthenticated: true,
    //     user: {
    //       firstName: "Aboubacar",
    //       lastName: "Doe",
    //       email: "abou.doe@example.com",
    //       dateOfBirth: "1985-05-20",
    //       phone: "123-456789",
    //       gender: GenderEnum.UNKNOWN,
    //       avatar: "https://example.com/avatar1.jpg",
    //       role: RoleEnum.USER,
    //       isActive: true,
    //       address: {
    //         street: "Rue de la paix",
    //         city: "Paris",
    //         zipCode: "75000",
    //         country: "France",
    //         complement: "Complément d'adresse",
    //         number: "12",
    //         createdAt: "2023-09-28T23:19:38.790Z",
    //         updatedAt: "2023-09-28T23:19:38.790Z",
    //         id: "65160bd16f17038b4e5d65f4",
    //       },
    //       createdAt: "2023-09-28T23:19:38.790Z",
    //       updatedAt: "2023-09-28T23:19:38.790Z",
    //       id: "651ec04a439249f99f8cc3b3",
    //     },
    //   })
    // );
  };

  mutation.isLoading && <div>Loading...</div>;

  return (
    <div className="relative flex w-full flex-col mt-44 rounded-xl mb-2 bg-white bg-clip-border text-gray-700 shadow-md">
      <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-blue-600 to-blue-400 bg-clip-border text-white shadow-lg shadow-blue-500/40">
        <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
          Connexion
        </h3>
      </div>

      <div className="flex flex-col gap-4 p-6">
        <div className="relative h-11 w-full min-w-[200px]">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-pink-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            E-mail
          </label>
        </div>
        <div className="relative h-11 w-full min-w-[200px]">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="peer h-full w-full rounded-md border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-3 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
          />
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.1] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Mot de passe
          </label>
        </div>
      </div>
      {message && (
        <NotificationMessage
          setErrorMessage={setMessage}
          message={message}
          color="red"
        />
      )}
      <div className="p-6 pt-0">
        <button
          onClick={handleLogin}
          className="block w-full select-none rounded-lg bg-gradient-to-tr from-blue-600 to-blue-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          data-ripple-light="true"
        >
          Se connecter
        </button>
        <p className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
          Je n&apos;ai pas encore de compte
          <button
            onClick={() => router.push("/auth/registration")}
            className="ml-1 block font-sans text-sm font-bold leading-normal text-blue-500 antialiased"
          >
            S&apos;inscrire
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;
