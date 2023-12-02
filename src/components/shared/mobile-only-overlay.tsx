import { useRouter } from "next/router";
import React from "react";

const MobileOnlyOverlay = () => {
  const router = useRouter()

  const handleActivateOverlay = () => {
    return (
      // auth.isAuthenticated &&
      // router.pathname !== "/auth/login" &&
      // router.pathname !== "/auth/registration" &&
      // router.pathname !== "/screens/cart-screen"
      !router.pathname.includes("/admin")
    );
  };
  if(!handleActivateOverlay()) return (<></>)
  return (
    <div
      className="mobile-only-overlay h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/images/overlay-bg.jpg')",
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="text-white text-2xl text-center">
          <p>
            <strong>AfroGraille</strong> est une application mobile, elle
            n&apos;est pas disponible sur ordinateur pour le moment.
          </p>
          <p className="mt-2 text-md">
            Vous devez l&apos;ouvrir sur votre téléphone pour pouvoir
            l&apos;utiliser.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileOnlyOverlay;
