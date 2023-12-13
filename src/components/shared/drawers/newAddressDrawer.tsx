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
  Checkbox,
} from "@material-tailwind/react";
import { IoCheckmark } from "react-icons/io5";
import { MdMyLocation } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { updateAddress } from "@/services/address";
import { updateUser } from "@/redux/features/authSlice";

const SelectAddressDrawer = () => {
  const dispatch = useDispatch();
  const constrols = useSelector(
    (state: RootState) => state.controls.values
  );
  const newAddressWindow = constrols.newAddressWindow;
  

  const token = useSelector((state: RootState) => state.auth.token);
  const user = useSelector((state: RootState) => state.auth.user);
  const [address, setAddress] = useState("");
  const [streetNumber, setStreetNumber] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("Marseille");
  const [zipCode, setZipCode] = useState("");
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const [intitule, setIntitule] = useState("");
  const [addressType, setAddressType] = useState<
    "maison" | "travail" | "ami" | "autre" | null
  >(null);
  const [isDefault, setIsDefault] = useState(false);
  const [formValid, setFormValid] = useState(false);


  const selectedAddress = user?.addresses[0];

  const router = useRouter();

  // ce useEffect permet de bloquer le scroll du body quand le drawer est ouvert
  useEffect(() => {
    if (newAddressWindow) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    }
  }, [newAddressWindow]);

  useEffect(() => {
    if (address.length > 0 && zipCode.length > 0) {
      setFormValid(true);
    } else {
      setFormValid(false);
    }
  }, [address, streetNumber, streetName, zipCode, addressType]);

  const handleSubmit = async () => {
    const streetNumber = address.split(" ")[0];
    const streetName = address.split(" ").slice(1).join(" ");
    const addressName = addressType === "autre" ? intitule : addressType;
    const newAddress = {
      number: streetNumber,
      street: streetName,
      city,
      zipCode,
      complement: deliveryInstructions,
      addressName,
      isDefault,
      country: "France",
      userId: user?.id,
      
    };

    if(!user || !selectedAddress) return router.push("/login");;
    const response = await updateAddress(newAddress, token,selectedAddress?.id);
    if (response.success) {
      dispatch(updateUser(response.user));
      // dispatch(updateControl({ orderChoiceDrawer: true }));
      dispatch(updateControl({ newAddressWindow: false }));
    } else if (response.code === 401) {
      router.push("/login");
    }
  };

  useEffect(() => {
    if(selectedAddress){
      setAddress(selectedAddress.number + " " + selectedAddress.street)
      setZipCode(selectedAddress.zipCode)
      if(selectedAddress.complement) setDeliveryInstructions(selectedAddress.complement)
      if(selectedAddress.addressName) setIntitule(selectedAddress.addressName)
      setIsDefault(selectedAddress.isDefault)
    }
  },[user])

  if (!user) return;
  if(!selectedAddress) return;
  if(!newAddressWindow) return;
  if(!token) return;


  return (
    <Drawer
      overlay={false}
      size={window.innerHeight}
      placement="bottom"
      open={newAddressWindow}
      className="p-4"
    >
      <div className="relative h-full">
        <div className="flex items-center justify-between">
          {/* <Typography variant="h5" color="blue-gray">
            NOUVELLE ADRESSE
          </Typography> */}
          <Typography variant="h5" color="blue-gray">
            MODIFIER MON ADRESSE
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={() => {
              // dispatch(updateControl({ orderChoiceDrawer: true }));
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
        <hr />

        <div className="my-4">
          <label className="block text-sm font-medium leading-6 text-gray-900">
            VOTRE ADRESSE
          </label>

          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            type="text"
            name="street"
            id="street"
            className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm eading-6"
            placeholder="Ex: 12 rue de la paix"
          />
        </div>
        <div className="flex justify-between ">
          <div className="mx-1">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              CODE POSTAL
            </label>

            <input
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              type="text"
              name="street"
              id="street"
              className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm eading-6"
              placeholder="13003"
            />
          </div>
          <div className="mx-1">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              VILLE
            </label>

            <input
              // value={city}
              // onChange={(e) => setCity(e.target.value)}
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
          <label className="block text-sm font-medium leading-6 text-gray-900">
            INDICATION POUR LE LIVREUR
          </label>

          <textarea
            value={deliveryInstructions}
            onChange={(e) => setDeliveryInstructions(e.target.value)}
            name="street"
            id="street"
            rows={3}
            cols={33}
            className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm eading-6"
            placeholder="Ex: 12 rue de la paix"
          ></textarea>
        </div>
        {/* <div>
          <h3>TYPE D&apos;ADRESSE</h3>

          <div className="flex justify-start ">
            
            <Radio
            onChange={(e) => console.log(e)}
              crossOrigin={undefined}
              name="type"
              label="Maison"
              icon={<IoCheckmark className="text-green-500" />}
              checked={addressType === "maison"}
              onClick={() => setAddressType("maison")}
            />

            
            <Radio
            onChange={(e) => console.log(e)}
              crossOrigin={undefined}
              name="type"
              label="Travail"
              icon={<IoCheckmark className="text-green-500" />}
              checked={addressType === "travail"}
              onClick={() => setAddressType("travail")}
            />

            
            <Radio
            onChange={(e) => console.log(e)}
              crossOrigin={undefined}
              name="type"
              label="Ami"
              icon={<IoCheckmark className="text-green-500" />}
              checked={addressType === "ami"}
              onClick={() => setAddressType("ami")}
            />

            
            <Radio
            onChange={(e) => console.log(e)}
              crossOrigin={undefined}
              name="type"
              label="Autre"
              icon={<IoCheckmark className="text-green-500" />}
              checked={addressType === "autre"}
              onClick={() => setAddressType("autre")}
            />
          </div>
        </div> */}
        <hr />
        {addressType === "autre" && (
          <div className="my-4">
            <label className="block text-sm font-medium leading-6 text-gray-900">
              INTITULÉ DE CETTE ADRESSE (Optionnel)
            </label>
            <input
              value={intitule}
              onChange={(e) => setIntitule(e.target.value)}
              type="text"
              name="street"
              id="street"
              className="block w-full rounded-md border-0 py-1.5 pl-2 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm eading-6"
              placeholder="Ex: Maison, Travail, Chez Amadou, etc."
            />
          </div>
        )}
        {/* <Checkbox
          crossOrigin={false}
          name="type"
          label="Choisir comme adresse par défaut"
          icon={<IoCheckmark className="text-green-500" />}
          checked={isDefault}
          onClick={() => setIsDefault(!isDefault)}
        /> */}
        <div className="p-2 absolute inset-x-0 bottom-0">
          <Button
            onClick={handleSubmit}
            disabled={!formValid}
            color="blue"
            fullWidth
          >
            Enregistrer
          </Button>
        </div>
      </div>
    </Drawer>
  );
};

export default SelectAddressDrawer;
