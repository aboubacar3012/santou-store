import { UserType } from "@/types/user.type";
import { Chip } from "@material-tailwind/react";
import React from "react";
type UserDetailsProps = {
  user: UserType | null;
};
const UserDetails = ({ user }: UserDetailsProps) => {
  if (!user) return <div>Loading</div>;

  return (
    <div className="mt-10  border-b">
      <h1 className="text-3xl font-medium text-gray-700 text-center">
        {user.firstName} {user.lastName}
      </h1>
      {/* role */}
      <div className="text-sm font-light text-gray-600 text-center">
        <Chip color="cyan" value={`Status: ${user.role}`} />
      </div>
      <div className="font-light text-gray-600 ">
        <span className="text-gray-900">E-mail:</span> {user.email}
      </div>
      <div className="font-light text-gray-600 ">
        <span className="text-gray-900">Phone: </span>
        {user.phone}
      </div>
      <div className="font-light text-gray-600 ">
        <span className="text-gray-900">Ne(e) le :</span> {user.dateOfBirth}
      </div>
      <div className="font-light text-gray-600 ">
        <span className="text-gray-900">Genre: </span>
        {user.gender}
      </div>
      {/* Address */}
      <div className="font-light text-gray-600 ">
        <span className="text-gray-900">Adresse: </span>
        {user.address.number} {user.address.street}
      </div>
      <div className="font-light text-gray-600 ">
        <span className="text-gray-900">Adresse: </span>
        {user.address.complement}
      </div>
      <div className="font-light text-gray-600 ">
        <span className="text-gray-900">Ville: </span>
        {user.address.city}
      </div>
      <div className="font-light text-gray-600 ">
        <span className="text-gray-900">Pays: </span>
        {user.address.country}
      </div>
      <div className="font-light text-gray-600 ">
        <span className="text-gray-900">Code postal: </span>
        {user.address.zipCode}
      </div>
    </div>
  );
};

export default UserDetails;
