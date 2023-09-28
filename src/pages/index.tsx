import Image from "next/image";
import { Inter } from "next/font/google";

import HomeScreenPage from "./screens/home-screen";
import NavbarComponent from "./components/shared/navbar";
import BottomTabBarComponent from "./components/shared/bottom-tab-bar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="fixed w-full  sm:w-6/12  overflow-y-scroll  rounded-1xl bg-white  shadow-2xl z-10">
      <NavbarComponent />
      <HomeScreenPage />
      <BottomTabBarComponent />
    </div>
  );
}
