import { BiHomeAlt2, BiUserCircle } from "react-icons/bi";
import { AiOutlineHistory } from "react-icons/ai";
import { BsBookmarks } from "react-icons/bs";

const BottomTabBarComponent = () => {
  return (
    <div className="sticky bottom-1 p-5 px-6 m-2   flex items-center justify-between   bg-gray-900 shadow-3xl text-gray-400 rounded-2xl cursor-pointer">
      <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
        <BiHomeAlt2 className="h-6 w-6" />
      </div>
      <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
        <AiOutlineHistory className="h-6 w-6" />
      </div>
      {/* Button se trouvant au millieu avec un bon design a reutiliser plus tard */}
      {/* <div className="flex flex-col items-center  hover:text-blue-400 ">
        <div className="absolute bottom-5 shadow-2xl text-center flex items-center justify-center rounded-full border-4 text-3xl border-gray-50 hover:border-blue-500 bg-blue-500 w-20 h-20 p-2 text-white transition ease-in duration-200 ">
          <i className="fas fa-phone-alt" />
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full border-4 opacity-50" />
        </div>
      </div> */}
      <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
        <BsBookmarks className="h-6 w-6" />
      </div>
      <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
        <BiUserCircle className="h-6 w-6" />
      </div>
    </div>
  );
};

export default BottomTabBarComponent;
