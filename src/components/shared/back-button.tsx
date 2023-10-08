import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";

type BackButtonProps = {
  screenName: string;
  onClick: () => void;
};

const BackButton = ({ screenName, onClick }: BackButtonProps) => {
  return (
    <div>
      <div className="flex items-center justify-start space-x-3 m-2">
        <button
          onClick={onClick}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900"
        >
          <IoArrowBackOutline className="w-6 h-6 text-blue-600 dark:text-blue-400" />
        </button>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
          {screenName}
        </h2>
      </div>
      <hr className="border-gray-500" />
    </div>
  );
};

export default BackButton;
