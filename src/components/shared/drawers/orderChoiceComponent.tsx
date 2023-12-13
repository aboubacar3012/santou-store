import { updateControl } from '@/redux/features/controlsSlice';
import { RootState } from '@/redux/store';
import { truncateText } from '@/utils/truncate-text';
import { Typography, IconButton, Button } from '@material-tailwind/react';
import { useRouter } from 'next/router';
import React from 'react'
import { AiOutlineFieldTime } from 'react-icons/ai';
import { FaLocationDot } from 'react-icons/fa6';
import { IoIosWalk } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';

const OrderChoiceComponent = () => {
  const dispatch = useDispatch();
  const orderChoiceDrawer = useSelector(
    (state: RootState) => state.controls.values.orderChoiceDrawer
  );
  const auth = useSelector((state: RootState) => state.auth);
 
  const takingOrder = auth.takingOrder
  const timeToPickup = auth.timeToPickup
  const deliveryAddress = auth.deliveryAddress;
  const isAuth = auth.isAuthenticated;
  const selectedAddress = auth.user?.addresses[0]; // A corriger

  const router = useRouter();


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
  console.log(router)
  return (
    <div className="bg-white p-2 rounded-2xl">
            <div className="flex items-center justify-between">
        <Typography variant="h5" color="blue-gray">
          COMMANDER
        </Typography>      
      </div>

      <div>
        <div className="flex justify-between w-full px-3 py-2">
          <div className="flex justify-start gap-3 items-center">
            <p className="text-blue-500 text-xl">
              <IoIosWalk />
            </p>
            <p>
              {takingOrder === null
                ? "Mode de récupération"
                : takingOrder === "DELIVERY"
                ? "Livraison (2€)"
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
      </div>
    </div>
  )
}

export default OrderChoiceComponent
