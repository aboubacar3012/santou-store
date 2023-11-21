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

  return (
    <Drawer
      size={500}
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
          onClick={() => dispatch(updateControl({ selectAddressDrawer: false }))}
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
      <div className="p-2">
        <Button color="blue" fullWidth className="bg-gray-500 flex justify-center items-center">
        <MdMyLocation className="text-blue-500 w-6 h-6 mx-2" />
          <p>Me géolocaliser</p>
        </Button>
      </div>
      <div>
        <hr />
        <Radio
          crossOrigin={false}
          name="type"
          label={<p>
            <h4 className="font-bold">Travail</h4>
            <p>10 Rue de la Paix</p>
            <p>13001 Marseille</p>
          </p>}
          icon={
            <IoCheckmark className="text-green-500" />
          }
        />
        <hr />
        <Radio
          crossOrigin={false}
          name="type"
          label={<p>
            <h4 className="font-bold">Maison</h4>
            <p>10 Rue de la Paix</p>
            <p>13001 Marseille</p>
          </p>}
          icon={
            <IoCheckmark className="text-green-500" />
          }
          defaultChecked
        />
        <hr/>
      </div>
      <div className="p-2">
        <Button onClick={() => dispatch(updateControl({newAddressWindow:true}))} color="blue" fullWidth className="bg-gray-500 flex flex justify-center items-center">
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
