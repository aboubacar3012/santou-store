import Image from "next/image";
import { Inter } from "next/font/google";

import HomeScreenPage from "./screens/home-screen";
import NavbarComponent from "./components/shared/navbar";
import BottomTabBarComponent from "./components/shared/bottom-tab-bar";
import AuthenticationScreen from "./screens/authentication-screen";
import OrdersScreenPage from "./screens/orders-screen";
import ProfileScreenPage from "./screens/profile-screen";
import CartScreen from "./screens/cart-screen";
import { useEffect, useState } from "react";
import FavoritesScreenPage from "./screens/favorites-screen";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateControl } from "@/redux/features/controlsSlice";

const inter = Inter({ subsets: ["latin"] });

export type Menu = "home" | "orders" | "favorites" | "profile";

export default function Home() {
  const [menu, setMenu] = useState<Menu>("home");
  const controls = useSelector((state: RootState) => state.controls.values);
  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateControl({ showCart: false }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menu]);

  const containerStyle =
    "fixed w-full  sm:w-6/12  overflow-y-scroll rounded-1xl  z-10";

  if (!auth.isAuthenticated)
    return (
      <div className={containerStyle}>
        <NavbarComponent />
        <AuthenticationScreen isAuthenticated={auth.isAuthenticated} />
      </div>
    );
  if (controls.showCart)
    return (
      <div className={containerStyle}>
        <NavbarComponent />
        <CartScreen />

        {/* <BottomTabBarComponent menu={menu} setMenu={setMenu} /> */}
      </div>
    );

  return (
    <div className={containerStyle}>
      <NavbarComponent />
      {menu === "home" && <HomeScreenPage />}
      {menu === "orders" && <OrdersScreenPage />}
      {menu === "profile" && <ProfileScreenPage />}
      {menu === "favorites" && <FavoritesScreenPage />}
      {controls.showCart && <CartScreen />}
      <BottomTabBarComponent menu={menu} setMenu={setMenu} />
    </div>
  );
}
