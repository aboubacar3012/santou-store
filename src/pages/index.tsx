import Image from "next/image";
import { Inter } from "next/font/google";

import HomeScreenPage from "./screens/home-screen";
import NavbarComponent from "./components/shared/navbar";
import BottomTabBarComponent from "./components/shared/bottom-tab-bar";
import AuthenticationScreen from "./screens/authentication-screen";
import OrdersScreenPage from "./screens/orders-screen";
import ProfileScreenPage from "./screens/profile-screen";
import CartScreen from "./screens/cart-screen";
import { useState } from "react";
import FavoritesScreenPage from "./screens/favorites-screen";

const inter = Inter({ subsets: ["latin"] });

export type Menu = "home" | "orders" | "favorites" | "profile";

export default function Home() {
  const [menu, setMenu] = useState<Menu>("home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated)
    return (
      <div className="fixed w-full  sm:w-6/12  overflow-y-scroll  rounded-1xl    z-10">
        <NavbarComponent />
        <AuthenticationScreen
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />
      </div>
    );
  return (
    <div className="fixed w-full  sm:w-6/12  overflow-y-scroll  rounded-1xl    z-10">
      <NavbarComponent />
      {menu === "home" && <HomeScreenPage />}
      {menu === "orders" && <OrdersScreenPage />}
      {menu === "profile" && <ProfileScreenPage />}
      {menu === "favorites" && <FavoritesScreenPage />}
      {/* <CartScreen /> */}
      <BottomTabBarComponent menu={menu} setMenu={setMenu} />
    </div>
  );
}
