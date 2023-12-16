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
import SpinnerOverlay from "./spinner-overlay";
import NavbarComponent from "./header";
import { useEffect, useState } from "react";
import OrderChoiceDrawer from "./drawers/orderChoiceDrawer";
import TakingOrderDrawer from "./drawers/takingOrderDrawer";
import PlanningOrderDrawer from "./drawers/planningOrderDrawer";
import SelectAddressDrawer from "./drawers/selectAddressDrawer";
import NewAddressDrawer from "./drawers/newAddressDrawer";
import isMobileDevice from "@/hooks/isMobileDevice";
import CartScreenDrawer from "@/pages/screens/cart-screen-drawer";
import PaymentDrawer from "../payment/payment-drawer";
import HeaderComponent from "./header";
import BottomTabs from "./bottom-tabs";

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
  const controls = useSelector((state: RootState) => state.controls);
  const router = useRouter();
  const [singleShop, setSingleShop] = useState<boolean>(false);
  const isMobile = isMobileDevice();

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
      // router.pathname !== "/screens/cart-screen"
      !router.pathname.includes("/admin") && !router.pathname.includes("/[id]") && !router.pathname.includes("/orderStatus") && !router.pathname.includes("/404")
    );
  };

  const handleShowHeader = () => {
    return !router.pathname.includes("/admin") && !router.pathname.includes("/[id]") && !router.pathname.includes("/orderStatus") && !router.pathname.includes("/404");
  };

  useEffect(() => {
    if (auth.takingOrder === null)
      dispatch(updateControl({ orderChoiceDrawer: true }));
  }, [auth]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header fixe */}
      {handleShowHeader() && <HeaderComponent />}

      {/* Main content avec défilement */}
      <main className="flex-grow  overflow-y-auto width-s"> {/* p-4 */ }
          {!handleShowHeader() && <div className="">{children}</div>} {/* my-4 */ }
          {handleShowHeader() && <div className="my-36">{children}</div>}
        {/* <div className="container mx-auto">
        </div> */}
      </main>
      {/* Tab inférieur fixe */}
      {handleShowBottomTab() && <BottomTabs />}

      {/* <CartButton /> */}
      <SpinnerOverlay show={loading} />
      {isMobile && (
        <div>
          {controls.values.orderChoiceDrawer && <OrderChoiceDrawer />}
          {controls.values.takingOrderDrawer && <TakingOrderDrawer />}
          {controls.values.planningOrderDrawer && <PlanningOrderDrawer />}
          {controls.values.selectAddressDrawer && <SelectAddressDrawer />}
          {controls.values.newAddressWindow && <NewAddressDrawer />}
          {controls.values.showCart && <CartScreenDrawer />}
          {controls.values.showPaymentDrawer && <PaymentDrawer />}
        </div>
      )}
    </div>
  );
};

export default Layout;
