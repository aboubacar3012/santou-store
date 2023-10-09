import { BiHomeAlt2, BiUserCircle } from "react-icons/bi";
import { AiOutlineHistory } from "react-icons/ai";
import { BsBookmarks } from "react-icons/bs";
import { GiShoppingCart } from "react-icons/gi";
import { FaStoreAlt } from "react-icons/fa";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { updateControl } from "@/redux/features/controlsSlice";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import CartButton from "./cart-button";

const Layout = ({ children }: any) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const isCartShowed = useSelector(
    (state: RootState) => state.controls.values.showCart
  );
  const auth = useSelector((state: RootState) => state.auth);
  const router = useRouter();

  if (
    !auth.isAuthenticated &&
    router.pathname !== "/auth/login" &&
    router.pathname !== "/auth/registration"
  ) {
    router.push("/auth/login");
  }

  const handleShowBottomTab = () => {
    return (
      auth.isAuthenticated &&
      router.pathname !== "/auth/login" &&
      router.pathname !== "/auth/registration" &&
      router.pathname !== "/screens/cart-screen"
    );
  };
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header fixe */}
      <header
        className="fixed w-full top-0 rounded-b-2xl bg-center cursor-pointer object-cover z-10 shadow-lg"
        style={{
          backgroundImage:
            'url("https://png.pngtree.com/png-clipart/20190927/ourlarge/pngtree-guinea-waving-flag-png-image_1735000.jpg")',
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
                <div className="flex flex-col justify-end items-center h-10">
                  {/* <span className="-mb-3 text-red-500 text-xl">
                  {cart.products.length}
                </span>
                <GiShoppingCart className="w-10 h-10" /> */}
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="p-3 rounded-lg  flex flex-col w-full">
          <h4 className="text-black-900 text-xl font-semibold  leading-tight truncate">
            Guistore
          </h4>
          <div className="flex justify-between items-center ">
            <div className="flex flex-col">
              <h2 className="text-sm flex items-center text-black-900 font-normal">
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
                Votre boutique 100% guinéenne
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
      </header>

      {/* Main content avec défilement */}
      <main className="flex-grow p-4 overflow-y-auto">
        <div className="container mx-auto">
          {/* Contenu principal */}
          <div className="my-28">{children}</div>
        </div>
      </main>
      {/* Tab inférieur fixe */}
      {handleShowBottomTab() && (
        // <footer className=" bg-gray-900 shadow-3xl rounded-2xl cursor-pointer text-white p-4 fixed bottom-0 w-full">
        //   <div className="container mx-auto flex justify-between">
            // <button
            //   onClick={() => router.push("/screens/home-screen")}
            //   type="button"
            //   className="inline-flex flex-col items-center justify-center px-5 transition ease-in duration-200 hover:text-blue-400 group"
            // >
            //   <BiHomeAlt2 className="h-6 w-6" />
            //   <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
            //     Home
            //   </span>
            // </button>
        //     <button
        //       onClick={() => router.push("/screens/orders-screen")}
        //       type="button"
        //       className="inline-flex flex-col items-center justify-center px-5 transition ease-in duration-200 hover:text-blue-400 group"
        //     >
        //       <AiOutlineHistory className="h-6 w-6" />
        //       <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
        //         Commandes
        //       </span>
        //     </button>
        //     <button className="absolute bottom-5 shadow-2xl text-center flex items-center justify-center rounded-full border-4 text-3xl border-gray-50 hover:border-blue-500 bg-blue-500 w-20 h-20 p-2 text-white transition ease-in duration-200 ">
        //       <i className="fas fa-phone-alt"></i>
        //       <span className="animate-ping absolute inline-flex h-full w-full rounded-full border-4 opacity-50"></span>
        //     </button>
        //     <button
        //       onClick={() => router.push("/screens/favorites-screen")}
        //       type="button"
        //       className="inline-flex flex-col items-center justify-center px-5 transition ease-in duration-200 hover:text-blue-400 group"
        //     >
        //       <BsBookmarks className="h-6 w-6" />
        //       <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
        //         Favoris
        //       </span>
        //     </button>
        //     <button
        //       onClick={() => router.push("/screens/profile-screen")}
        //       type="button"
        //       className="inline-flex flex-col items-center justify-center px-5 transition ease-in duration-200 hover:text-blue-400 group"
        //     >
        //       <BiUserCircle className="h-6 w-6" />
        //       <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
        //         Profil
        //       </span>
        //     </button>
        //   </div>
        // </footer>
          <div className="container fixed bottom-0  p-3   flex items-center justify-between   bg-gray-900 shadow-3xl text-gray-400 rounded-2xl cursor-pointer">
            <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
            <button
              onClick={() => router.push("/screens/home-screen")}
              type="button"
              className="inline-flex flex-col items-center justify-center group"
            >
              <BiHomeAlt2 className="h-6 w-6" />
              <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                Accueil
              </span>
            </button>
            </div>
            <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
            <button
              onClick={() => router.push("/screens/orders-screen")}
              type="button"
              className="inline-flex flex-col items-center justify-center group"
            >
              <AiOutlineHistory className="h-6 w-6" />
              <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                Commandes
              </span>
            </button>
            </div>
            <div  onClick={() => router.push("/screens/cart-screen")} className="flex flex-col items-center  hover:text-blue-400 ">
              <div className="absolute bottom-10 shadow-2xl text-center flex items-center justify-center rounded-full border-4 text-3xl border-gray-50 hover:border-blue-500 bg-blue-500 w-14 h-14 p-2 text-white transition ease-in duration-500 ">
              <div className="flex flex-col justify-end items-center">
              {cart.products.length > 0 && (
                <span className="-mb-3 text-red-500 text-xl">
                {cart.products.length}
              </span>
              )}
              <GiShoppingCart className="w-8 h-8" />
            </div>
                {/* <span className="animate absolute inline-flex h-full w-full rounded-full border-4 opacity-50" /> */}
              </div>
            </div>
            <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
            <button
              onClick={() => router.push("/screens/favorites-screen")}
              type="button"
              className="inline-flex flex-col items-center justify-center group"
            >
              <BsBookmarks className="h-6 w-6" />
              <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                Favoris
              </span>
            </button>
            </div>
            <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
            <button
              onClick={() => router.push("/screens/profile-screen")}
              type="button"
              className="inline-flex flex-col items-center justify-center group"
            >
              <BiUserCircle className="h-6 w-6" />
              <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                Mon Profil
              </span>
            </button>
            </div>
          </div>
      )}

      {/* <CartButton /> */}
    </div>
  );
};

export default Layout;
