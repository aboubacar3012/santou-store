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
  const newAddressWindow = useSelector(
    (state: RootState) => state.controls.values.newAddressWindow
  );

  return (
    <Drawer
      size={window.innerHeight}
      placement="bottom"
      open={newAddressWindow}
      className="p-4"
    >
      <div className="relative h-full">
      <div className="flex items-center justify-between">
        <Typography variant="h5" color="blue-gray">
          NOUVELLE ADRESSE
        </Typography>
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={() => {
            dispatch(updateControl({ selectAddressDrawer: true }));
            dispatch(updateControl({ newAddressWindow: false }));
          }}
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
      <hr/>

      <div className="my-4">
      <label className="block text-sm font-medium leading-6 text-gray-900">VOTRE ADRESSE</label>
      
        <input
          type="text"
          name="street"
          id="street"
          className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm eading-6"
          placeholder="Ex: 12 rue de la paix"
        />
   
      </div>
      <div className="flex justify-between ">
      <div className="mx-1">
      <label className="block text-sm font-medium leading-6 text-gray-900">CODE POSTAL</label>
      
        <input
          type="text"
          name="street"
          id="street"
          className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm eading-6"
          placeholder="Ex: 12 rue de la paix"
        />
   
      </div>
      <div className="mx-1">
      <label className="block text-sm font-medium leading-6 text-gray-900">VILLE</label>
      
        <input
          type="text"
          name="street"
          id="street"
          value="Marseille"
          disabled={true}
          className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm eading-6"
          placeholder="Ex: 12 rue de la paix"
        />
   
      </div>
      </div>
      <div className="my-4 mx-1">
      <label className="block text-sm font-medium leading-6 text-gray-900">INDICATION POUR LE LIVREUR</label>
      
        <textarea
          name="street"
          id="street"
          rows={3} cols={33}
          className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm eading-6"
          placeholder="Ex: 12 rue de la paix"
        ></textarea>
   
      </div>
      <div>
        <h3>TYPE D&apos;ADRESSE</h3>

        <div className="flex justify-between ">
          {/* Maison */}
        <Radio
          crossOrigin={false}
          name="type"
          label="Maison"
          icon={
            <IoCheckmark className="text-green-500" />
          }
          defaultChecked
        />

        {/* Travail */}
        <Radio
          crossOrigin={false}
          name="type"
          label="Travail"
          icon={
            <IoCheckmark className="text-green-500" />
          }
        />

        {/* Ami */}
        <Radio
          crossOrigin={false}
          name="type"
          label="Ami"
          icon={
            <IoCheckmark className="text-green-500" />
          }
        />

        {/* Autre */}
        <Radio
          crossOrigin={false}
          name="type"
          label="Autre"
          icon={
            <IoCheckmark className="text-green-500" />
          }
        />
        </div>
        
        </div>
        <div className="my-4">
      <label className="block text-sm font-medium leading-6 text-gray-900">INTITULÉ DE CETTE ADRESSE (Optionnel)</label>
        <input
          type="text"
          name="street"
          id="street"
          className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm eading-6"
          placeholder="Ex: Maison, Travail, Chez Amadou, etc."
        />
   
      </div>
      <Radio
          crossOrigin={false}
          name="type"
          label="Choisir comme adresse par défaut"
          icon={
            <IoCheckmark className="text-green-500" />
          }
        />
      <div onClick={() => {
            dispatch(updateControl({ selectAddressDrawer: true }));
            dispatch(updateControl({ newAddressWindow: false }));
          }} className="p-2 absolute inset-x-0 bottom-0">
        <Button color="blue" fullWidth>
          Enregistrer
        </Button>
      </div>
      </div>
    </Drawer>
  );
};

export default SelectAddressDrawer;
