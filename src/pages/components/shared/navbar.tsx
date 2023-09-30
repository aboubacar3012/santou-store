import { GiShoppingCart } from "react-icons/gi";
import { FaStoreAlt } from "react-icons/fa";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { updateControl } from "@/redux/features/controlsSlice";
const NavbarComponent = () => {
  const dispatch = useDispatch();
  return (
    <div
      className="realtive sticky top-0  w-full rounded-b-2xl bg-center cursor-pointer object-cover z-10 shadow-lg"
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1622180203374-9524a54b734d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
      }}
    >
      <nav className="p-2 flex flex-grow relative justify-between z-10 items-center mx-auto h-18">
        {/* <div className="inline relative">
          <button
            type="button"
            className="inline-flex items-center relative text-gray-300 hover:text-white mr-3"
          >
            <FaStoreAlt className="w-6 h-6" />
          </button>
        </div> */}
        <div className="inline-flex">
          <Link href="/">
            <div className="">{/* <h1>Aboubcar Diallo</h1> */}</div>
          </Link>
        </div>
        <div
          onClick={() => dispatch(updateControl({ showCart: true }))}
          className="flex-initial"
        >
          <div className="flex justify-end items-center relative">
            <div className="inline relative">
              <div className="flex flex-col justify-end items-center">
                <span className="-mb-3">3</span>
                <GiShoppingCart className="w-10 h-10" />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="p-3 rounded-lg  flex flex-col w-full">
        <h4 className="text-white text-xl font-semibold  leading-tight truncate">
          AfriStore
        </h4>
        <div className="flex justify-between items-center ">
          <div className="flex flex-col">
            <h2 className="text-sm flex items-center text-gray-100 font-normal">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                ></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Votre boutique 100% africaine
            </h2>
          </div>
        </div>
      </div>
      {/* Input de recherche a reutiliser plus tard peut etre */}
      {/* <div className="flex items-center justify-between mt-3 px-3 z-10">
            <div className="relative w-full">
              <input
                type="text"
                className="bg-purple-white shadow rounded-xl border-0 p-3 w-full"
                placeholder="Search somthing..."
              />
              <div className="absolute top-0 right-0 p-4 pr-3 text-purple-lighter">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div> */}
    </div>
  );
};

export default NavbarComponent;
