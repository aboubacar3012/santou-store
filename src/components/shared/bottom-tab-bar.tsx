import { BiHomeAlt2, BiUserCircle } from "react-icons/bi";
import { AiOutlineHistory } from "react-icons/ai";
import { BsBookmarks } from "react-icons/bs";
import { Dispatch, SetStateAction } from "react";
import { Menu } from "@/pages";

interface MenuProps {
  menu: string;
  setMenu: Dispatch<SetStateAction<Menu>>;
}

const BottomTabBarComponent = ({ menu, setMenu }: MenuProps) => {
  return (
    // <div className="sticky bottom-1 p-5 px-6 m-2   flex items-center justify-between   bg-gray-900 shadow-3xl text-gray-400 rounded-2xl cursor-pointer">
    //   <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
    //     <BiHomeAlt2 className="h-6 w-6" />
    //   </div>
    //   <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
    //     <AiOutlineHistory className="h-6 w-6" />
    //   </div>
    //   {/* Button se trouvant au millieu avec un bon design a reutiliser plus tard */}
    //   {/* <div className="flex flex-col items-center  hover:text-blue-400 ">
    //     <div className="absolute bottom-5 shadow-2xl text-center flex items-center justify-center rounded-full border-4 text-3xl border-gray-50 hover:border-blue-500 bg-blue-500 w-20 h-20 p-2 text-white transition ease-in duration-200 ">
    //       <i className="fas fa-phone-alt" />
    //       <span className="animate-ping absolute inline-flex h-full w-full rounded-full border-4 opacity-50" />
    //     </div>
    //   </div> */}
    //   <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
    //     <BsBookmarks className="h-6 w-6" />
    //   </div>
    //   <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
    //     <BiUserCircle className="h-6 w-6" />
    //   </div>
    // </div>
    <div className="fixed bottom-0 left-0 z-50 w-full pb-3  h-16 mt-3  bg-gray-900 shadow-3xl text-gray-400 rounded-2xl cursor-pointer ">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        <button
          onClick={() => setMenu("home")}
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 transition ease-in duration-200 hover:text-blue-400 group"
        >
          <BiHomeAlt2 className="h-6 w-6" />
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            Home
          </span>
        </button>
        <button
          onClick={() => setMenu("orders")}
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 transition ease-in duration-200 hover:text-blue-400 group"
        >
          <AiOutlineHistory className="h-6 w-6" />
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            Commandes
          </span>
        </button>
        <button
          onClick={() => setMenu("favorites")}
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 transition ease-in duration-200 hover:text-blue-400 group"
        >
          <BsBookmarks className="h-6 w-6" />
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            Favoris
          </span>
        </button>
        <button
          onClick={() => setMenu("profile")}
          type="button"
          className="inline-flex flex-col items-center justify-center px-5 transition ease-in duration-200 hover:text-blue-400 group"
        >
          <BiUserCircle className="h-6 w-6" />
          <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            Profil
          </span>
        </button>
      </div>
    </div>
  );
};

export default BottomTabBarComponent;
