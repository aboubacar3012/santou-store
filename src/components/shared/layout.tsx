import { BiHomeAlt2, BiUserCircle } from "react-icons/bi";
import { AiOutlineHistory } from "react-icons/ai";
import { BsBookmarks } from "react-icons/bs";
import { GiShoppingCart } from "react-icons/gi";
import { FaStoreAlt } from "react-icons/fa";
import { GoRocket } from "react-icons/go";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { updateControl } from "@/redux/features/controlsSlice";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import CartButton from "./cart-button";
import SpinnerOverlay from "./spinner-overlay";
import NavbarComponent from "./navbar";
import { useEffect, useState } from "react";
import OrderChoiceDrawer from "./drawers/orderChoiceDrawer";
import TakingOrderDrawer from "./drawers/takingOrderDrawer";
import PlanningOrderDrawer from "./drawers/planningOrderDrawer";
import SelectAddressDrawer from "./drawers/selectAddressDrawer";
import NewAddressDrawer from "./drawers/newAddressDrawer";
import useScreenDimension from "@/hooks/useScreenDimension";

const Layout = ({ children }: any) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);
  const isCartShowed = useSelector(
    (state: RootState) => state.controls.values.showCart
  );
  const auth = useSelector((state: RootState) => state.auth);
  const loading = useSelector(
    (state: RootState) => state.controls.values.spinner
  );
  const router = useRouter();
  const [singleShop, setSingleShop] = useState<boolean>(false);
  const dimension = useScreenDimension();

  // if (
  //   !auth.isAuthenticated &&
  //   router.pathname !== "/auth/login" &&
  //   router.pathname !== "/auth/registration"
  // ) {
  //   router.push("/auth/login");
  // }

  const handleShowBottomTab = () => {
    return (
      // auth.isAuthenticated &&
      // router.pathname !== "/auth/login" &&
      // router.pathname !== "/auth/registration" &&
      router.pathname !== "/screens/cart-screen"
      // router.pathname !== "/screens/profile-screen"
    );
  };

  useEffect(() => {
    if (auth.takingOrder === null)
      dispatch(updateControl({ orderChoiceDrawer: true }));
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header fixe */}
      <NavbarComponent singleShop={singleShop} setSingleShop={setSingleShop} />

      {/* Main content avec défilement */}
      <main className="flex-grow p-4 overflow-y-auto">
        <div className="container mx-auto">
          <div className="my-36">{children}</div>
        </div>
      </main>
      {/* Tab inférieur fixe */}
      {handleShowBottomTab() && (
        <div className="container fixed bottom-0  p-3   flex items-center justify-between   bg-gray-900 shadow-3xl text-gray-400 cursor-pointer">
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
          <div
            onClick={() => router.push("/screens/cart-screen")}
            className="flex flex-col items-center  hover:text-blue-400 "
          >
            <div className="absolute bottom-9 shadow-2xl text-center flex items-center justify-center rounded-full border-4 text-3xl border-gray-50 hover:border-blue-500 bg-blue-500 w-16 h-16 p-2 text-white transition ease-in duration-500 ">
              <div className="flex flex-col justify-end items-center">
                {cart.products.length > 0 && (
                  <span className="-mb-3 text-red-500 text-xl">
                    {cart.products.length}
                  </span>
                )}
                <GiShoppingCart className="w-8 h-8" />
              </div>
              {
                cart.products.length > 0 && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full border-4 opacity-50" />
                )
              }
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
          {/* <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 ">
            <button
              onClick={() => router.push("/screens/favorites-screen")}
              type="button"
              className="inline-flex flex-col items-center justify-center group"
            >
              <GoRocket className="h-6 w-6" />
              <span className="text-sm text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">
                Missions
              </span>
            </button>
            </div> */}
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
      <SpinnerOverlay show={loading} />
      {dimension && dimension < 768 && (
        <div>
          <OrderChoiceDrawer />
          <TakingOrderDrawer />
          <PlanningOrderDrawer />
          <SelectAddressDrawer />
          <NewAddressDrawer />
        </div>
      )}
    </div>
  );
};

export default Layout;
