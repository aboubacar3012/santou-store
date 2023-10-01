import { UserType } from "@/types/cart.type";
import { Chip } from "@material-tailwind/react";
import React from "react";
type UserDetailsProps = {
  user: UserType;
};
const UserDetails = ({ user }: UserDetailsProps) => {
  if (!user) return <div>Loading</div>;

  return (
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
    </div>
  );
};

export default UserDetails;
