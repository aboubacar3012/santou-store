import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { updateControl } from "@/redux/features/controlsSlice";
import { RootState } from "@/redux/store";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useRouter } from "next/router";
import { BsArrowLeftCircle } from "react-icons/bs";
import { truncateText } from "../../../utils/truncate-text";
import { useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { IoIosWalk } from "react-icons/io";
import { AiOutlineFieldTime } from "react-icons/ai";
import { FaLocationDot } from "react-icons/fa6";

const OrderChoiceDrawer = () => {
  const dispatch = useDispatch();
  const orderChoiceDrawer = useSelector(
    (state: RootState) => state.controls.values.orderChoiceDrawer
  );
  const auth = useSelector((state: RootState) => state.auth);
  if(!auth) return;
  const takingOrder = auth.takingOrder
  const timeToPickup = auth.timeToPickup
  const deliveryAddress = auth.deliveryAddress;
  const isAuth = auth.isAuthenticated;
  const selectedAddress = auth.user?.addresses[0]; // A corriger


  const handleOnClose = () => {
    if(takingOrder === null) { 
      alert("Veuillez choisir un mode de récupération")
      dispatch(updateControl({ takingOrderDrawer: true }));
    }
    // else if(deliveryAddress === null){
    //   alert("Veuillez choisir une adresse de livraison")
    //   dispatch(updateControl({ selectAddressDrawer: true }));
    // }
    else {
      dispatch(updateControl({ orderChoiceDrawer: false }));
    }

  }

  return (
    <Drawer
      size={230}
      placement="bottom"
      open={orderChoiceDrawer}
      className="p-4 rounded-t-2xl rounded-t-3xl"
    >
      <div className="flex items-center justify-between">
        <Typography variant="h5" color="blue-gray">
          COMMANDER
        </Typography>
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={handleOnClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>

      <div>
        <hr />
        <div className="flex justify-between w-full px-3 py-2">
          <div className="flex justify-start gap-3 items-center">
            <p className="text-blue-500 text-xl">
              <IoIosWalk />
            </p>
            <p>
              {takingOrder === null
                ? "Mode de récupération"
                : takingOrder === "delivery"
                ? "Livraison"
                : "À emporter"}
            </p>
          </div>
          <p
            onClick={() => dispatch(updateControl({ takingOrderDrawer: true }))}
            className="text-blue-500"
          >
            Modifier
          </p>
        </div>
        <hr />
        <div className=" flex justify-between w-full px-3 py-2">
          <div className="flex justify-start gap-3 items-center">
            <p className="text-blue-500 text-xl">
              <AiOutlineFieldTime />
            </p>
            <p>
              {timeToPickup === null
                ? "Quand récupérer votre commande ?"
                : timeToPickup.now
                ? "Maintenant"
                : `Plus tard (${timeToPickup.day} ${timeToPickup.period})`}
            </p>
          </div>
          <p
            onClick={() =>
              dispatch(updateControl({ planningOrderDrawer: true }))
            }
            className="text-blue-500"
          >
            Planifier
          </p>
        </div>
        <hr />
        {
          isAuth && selectedAddress && (
            <div className=" flex justify-between w-full px-3 py-2 ">
          <div className="flex justify-start gap-3 items-center">
            <p className="text-blue-500 text-xl">
              <FaLocationDot />
            </p>
            <p className="text-sm">
              {selectedAddress.number} {" "}
              <span>
                {truncateText(selectedAddress.street,16)}
              </span>
              , {selectedAddress.zipCode} {selectedAddress.city}
            </p>
          </div>
          <p
            onClick={() =>
              dispatch(updateControl({ newAddressWindow: true }))
            }
            className="text-blue-500"
          >
            Modifier
          </p>
        </div>
          )
        }
        <hr />
      </div>
      <div
        onClick={handleOnClose}
        className="p-2"
      >
        <Button color="blue" fullWidth>
          Enregistrer
        </Button>
      </div>
    </Drawer>
  );
};

export default OrderChoiceDrawer;
