import { updateControl } from "@/redux/features/controlsSlice";
import React from "react";
import { useDispatch } from "react-redux";

const ContinueShoppingBtn = () => {
  const dispatch = useDispatch();

  return (
    <div className="mt-4 flex justify-center text-center text-sm text-gray-500">
      <p>
        ou
        <button
          onClick={() => dispatch(updateControl({ showCart: false }))}
          type="button"
          className="font-medium text-indigo-600 hover:text-indigo-500 px-2"
        >
          Continuer mes achats
          <span aria-hidden="true"> →</span>
        </button>
      </p>
    </div>
  );
};

export default ContinueShoppingBtn;
