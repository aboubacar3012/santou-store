import { clearControls, updateControl } from "@/redux/features/controlsSlice";
import React from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

const ContinueShoppingBtn = () => {
  const dispatch = useDispatch();
  const router = useRouter();


  return (
    <div className="mt-4 flex justify-center text-center text-sm text-gray-500">
      <button
        onClick={() => {
          dispatch(clearControls())
          router.push("/screens/home-screen")
        }}
        type="button"
        className="font-medium text-indigo-600 hover:text-indigo-500 px-2"
      >
        Continuer mes achats
        <span aria-hidden="true"> →</span>
      </button>
    </div>
  );
};

export default ContinueShoppingBtn;
