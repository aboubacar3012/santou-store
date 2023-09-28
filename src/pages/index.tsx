import Image from "next/image";
import { Inter } from "next/font/google";

import HomeScreenPage from "./screens/home-screen";
import NavbarComponent from "./components/shared/navbar";
import BottomTabBarComponent from "./components/shared/bottom-tab-bar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="w-full h-screen sm:w-6/12 lg:w-4/12 xl:w-4/12  overflow-y-scroll  border-8 rounded-1xl bg-white border-gray-800 shadow-2xl z-10">
      <NavbarComponent />
      <HomeScreenPage />
      <BottomTabBarComponent />
    </div>
  );
}
