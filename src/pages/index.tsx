import Image from "next/image";
import { Inter } from "next/font/google";

import HomeScreenPage from "./screens/home-screen";
import NavbarComponent from "./components/shared/navbar";
import BottomTabBarComponent from "./components/shared/bottom-tab-bar";
import AuthenticationScreen from "./screens/authentication-screen";
import OrdersScreenPage from "./screens/orders-screen";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="fixed w-full  sm:w-6/12  overflow-y-scroll  rounded-1xl bg-gray-100  shadow-2xl z-10">
      <NavbarComponent />
      {/* <HomeScreenPage /> */}
      <OrdersScreenPage />
      <BottomTabBarComponent />
      {/* <AuthenticationScreen /> */}
    </div>
  );
}
