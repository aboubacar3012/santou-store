import { GenderEnum, RoleEnum, UserType } from "@/types/cart.type";
import { Button, Chip } from "@material-tailwind/react";
import { BsArrowRight } from "react-icons/bs";
import UserDetails from "../components/profile/user-details";
import { useState } from "react";
import MerchantOrders from "../components/profile/merchant-orders";
import ProductManagement from "../components/profile/product-management";

export const user: UserType = {
  id: "12345",
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@example.com",
  dateOfBirth: "1990-01-01",
  phone: "1234567890",
  gender: GenderEnum.MALE,
  avatar: "path/to/avatar.jpg",
  role: RoleEnum.USER,
  isActive: true,
  country: "USA",
  city: "New York",
  street: "1234 Elm St",
  zipCode: "10001",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};
export enum PageToShow {
  profile = "profile",
  productManagement = "product-management",
  merchantOrders = "merchant-orders",
}

const ProfileScreenPage = () => {
  const [pageToShow, setPageToShow] = useState<PageToShow>(PageToShow.profile);

  if (pageToShow === PageToShow.profile)
    return (
      <div className="p-8 bg-white shadow mt-20 h-screen ">
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
        <UserDetails user={user} />
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
        </div>{" "}
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
