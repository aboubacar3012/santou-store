import { GenderEnum, RoleEnum, UserType } from "@/types/cart.type";
import { Button, Chip } from "@material-tailwind/react";
import { BsArrowRight } from "react-icons/bs";

const user: UserType = {
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

const ProfileScreenPage = () => {
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
      <div className="mt-10  border-b">
        {" "}
        <h1 className="text-3xl font-medium text-gray-700 text-center">
          {user.firstName} {user.lastName}
        </h1>{" "}
        {/* role */}
        <p className="text-sm font-light text-gray-600 text-center">
          <Chip color="cyan" value={`Status: ${user.role}`} />
        </p>
        <p className="font-light text-gray-600 ">
          <span className="text-gray-900">E-mail:</span> {user.email}
        </p>
        <p className="font-light text-gray-600 ">
          <span className="text-gray-900">Phone: </span>
          {user.phone}
        </p>
        <p className="font-light text-gray-600 ">
          <span className="text-gray-900">Ne(e) le :</span> {user.dateOfBirth}
        </p>
        <p className="font-light text-gray-600 ">
          <span className="text-gray-900">Genre: </span>
          {user.gender}
        </p>
        {/* Address */}
        <p className="font-light text-gray-600 ">
          <span className="text-gray-900">Adresse: </span>
          {user.street}
        </p>
        <p className="font-light text-gray-600 ">
          <span className="text-gray-900">Ville: </span>
          {user.city}
        </p>
        <p className="font-light text-gray-600 ">
          <span className="text-gray-900">Pays: </span>
          {user.country}
        </p>
        <p className="font-light text-gray-600 ">
          <span className="text-gray-900">Code postal: </span>
          {user.zipCode}
        </p>
      </div>{" "}
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
        >
          Commandes <BsArrowRight className="w-6 h-6" />
        </Button>
        <Button
          size="sm"
          fullWidth
          variant="text"
          className="flex justify-between items-center gap-2 bg-gray-50"
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
};

export default ProfileScreenPage;
