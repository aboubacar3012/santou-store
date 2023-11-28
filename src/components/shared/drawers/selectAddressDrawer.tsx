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
  Radio,
} from "@material-tailwind/react";
import { IoCheckmark } from "react-icons/io5";
import { MdMyLocation } from "react-icons/md";
import { FaPlus } from "react-icons/fa";

const SelectAddressDrawer = () => {
  const dispatch = useDispatch();
  const selectAddressDrawer = useSelector(
    (state: RootState) => state.controls.values.selectAddressDrawer
  );
  const auth = useSelector((state: RootState) => state.auth);
  const user = auth.user;
  const isAuth = auth.isAuthenticated;

  if(!isAuth) return;
  if(!selectAddressDrawer) return;
  

  return (
    <Drawer
      size={400}
      placement="bottom"
      open={selectAddressDrawer}
      onClose={() => dispatch(updateControl({ selectAddressDrawer: false }))}
      className="p-4 rounded-t-2xl rounded-t-3xl"
    >
      <div className="flex items-center justify-between">
        <Typography variant="h5" color="blue-gray">
          VOTRE ADRESSE
        </Typography>
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={() =>
            dispatch(updateControl({ selectAddressDrawer: false }))
          }
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
      {/* <div className="p-2">
        <Button
          color="blue"
          fullWidth
          className="bg-gray-500 flex justify-center items-center"
        >
          <MdMyLocation className="text-blue-500 w-6 h-6 mx-2" />
          <p>Me géolocaliser</p>
        </Button>
      </div> */}
     
        <div className="h-44 overflow-scroll">
        <hr />
        {user && user.addresses && user.addresses.map((address, index) => (
          <div key={index}>
            <Radio
            onChange={(e) => console.log(e)}
              crossOrigin={undefined}
              name="type"
              label={
                <p>
                  {address.addressName && <h4 className="font-bold">{address.addressName}</h4>}
                  <p>
                  {address.number} {address.street} 
                  </p>
                  <p>
                  {address.complement} 
                  </p>
                  <p>
                  {address.zipCode} {address.city}
                  </p>
                </p>
              }
              icon={<IoCheckmark className="text-green-500" />}
            />
            <hr />
          </div>
        ))}

        <hr />
      </div>

      <div className="p-2">
        <Button
          onClick={() => dispatch(updateControl({ newAddressWindow: true }))}
          color="blue"
          fullWidth
          className="bg-gray-500 flex flex justify-center items-center"
        >
          <FaPlus className="text-blue-500 w-6 h-6 mx-2" />
          <p>AJOUTER UNE NOUVELLE ADRESSE</p>
        </Button>
      </div>
      <div className="p-2">
        <Button color="blue" fullWidth>
          Enregistrer
        </Button>
      </div>
    </Drawer>
  );
};

export default SelectAddressDrawer;
