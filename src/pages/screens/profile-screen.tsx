import { Button, Chip } from "@material-tailwind/react";
import { BsArrowRight } from "react-icons/bs";
import UserDetails from "../../components/profile/user-details";
import { useState } from "react";
import MerchantOrders from "../../components/profile/merchant-orders";
import ProductManagement from "../../components/profile/product-management";
import { logout } from "@/redux/features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { GenderEnum, RoleEnum, UserType } from "@/types/user.type";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import NeedToConnectComponent from "@/components/shared/need-to-connect";
import TabSelector from "@/components/shared/tab-selector";
import { clearCart } from "@/redux/features/cartSlice";



export enum PageToShow {
  profile = "profile",
  productManagement = "product-management",
  merchantOrders = "merchant-orders",
}

const ProfileScreenPage = () => {
  const [pageToShow, setPageToShow] = useState<PageToShow>(PageToShow.profile);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const router = useRouter();

  if (!isAuthenticated) return <NeedToConnectComponent />;

  if (pageToShow === PageToShow.profile)
    return (
      <div className="p-8 pb-20 bg-white shadow mt-52">
        {" "}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {" "}
          <div className="relative">
            {" "}
            <div className="w-32 h-32 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-24 w-24"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                {" "}
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <UserDetails user={user || null} />
        {/* <h1
        className="text-3xl font-medium text-gray-700 text-center mt-5 cursor-pointer hover:text-blue-500"
        >
          Changer de mode 
        </h1>
        <TabSelector
          tab1="Livraisons"
          tab2="Commandes"
          handleClickTab1={() => {}}
          handleClickTab2={() => {}}
        />
        {user && user.role !== RoleEnum.USER && (
          <div className=" border-b space-y-2 pb-2">
            {" "}
            <h1 className="text-3xl font-medium text-gray-700 text-center">
              Admin
            </h1>
            <Button
              size="sm"
              fullWidth
              variant="text"
              className="flex justify-between items-center gap-2 bg-gray-50"
              onClick={() => setPageToShow(PageToShow.merchantOrders)}
            >
              Commandes <BsArrowRight className="w-6 h-6" />
            </Button>
            <Button
              size="sm"
              fullWidth
              variant="text"
              className="flex justify-between items-center gap-2 bg-gray-50"
              onClick={() => setPageToShow(PageToShow.productManagement)}
            >
              Gestion de produits <BsArrowRight className="w-6 h-6" />
            </Button>
          </div>
        )} */}
        {user && user.role === RoleEnum.USER && (
          <Button
          className="mt-5"
          onClick={() => router.push("/admin/admin-screen")}
          color="blue"
          fullWidth
        >
          Acceder au dashboard admin
        </Button>
        )}
        
        <Button
          className="mt-5"
          onClick={() => {
            dispatch(logout());
            dispatch(clearCart());
            router.push("/auth/login");
          }}
          color="red"
          fullWidth
        >
          Se deconnecter
        </Button>
        {/* <div className=" border-b space-y-2 pb-2">
        {" "}
        <h1 className="text-3xl font-medium text-gray-700 text-center">
          Aides
        </h1>
        <Button
          size="sm"
          fullWidth
          variant="text"
          className="flex justify-between items-center gap-2 bg-gray-50"
        >
          Nous contactez <BsArrowRight className="w-6 h-6" />
        </Button>
        <Button
          size="sm"
          fullWidth
          variant="text"
          className="flex justify-between items-center gap-2 bg-gray-50"
        >
          Condition generales <BsArrowRight className="w-6 h-6" />
        </Button>
      </div>{" "} */}
      </div>
    );
  if (pageToShow === PageToShow.productManagement)
    return <ProductManagement setPageToShow={setPageToShow} />;
  if (pageToShow === PageToShow.merchantOrders)
    return <MerchantOrders setPageToShow={setPageToShow} />;
};

export default ProfileScreenPage;
