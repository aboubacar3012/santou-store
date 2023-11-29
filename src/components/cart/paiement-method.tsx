import React, { useState } from "react";
import {
  Radio,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
  Switch,
  Button,
} from "@material-tailwind/react";
import { SiApplepay } from "react-icons/si";
import { BsCreditCard2Front } from "react-icons/bs";
import { RiSecurePaymentLine } from "react-icons/ri";
import { GrSecure } from "react-icons/gr";
import { GiCash } from "react-icons/gi";
import { FaGooglePay } from "react-icons/fa6";
import { CartType } from "@/types/cart.type";



type PaiementMethodProps = {
  setPaymentStep: React.Dispatch<React.SetStateAction<number>>;
  method: string;
  setMethod: React.Dispatch<React.SetStateAction<"cash" | "credit-card" | "wallet">>;
  setValidateCart: React.Dispatch<React.SetStateAction<boolean>>;
};
const PaiementMethod = ({ method, setMethod, setPaymentStep, setValidateCart}: PaiementMethodProps) => {
  const [saveCreditCard, setSaveCreditCard] = useState(true);

  return (
    <div>
      {/* Choissez votre method de payment */}
      <div className="flex items-center justify-between flex-col">
        <Typography variant="h4" color="blue-gray" className="text-center">
          Choisissez votre méthode de paiement
        </Typography>
        {/* <div className="flex items-center">
          <GrSecure className="w-6 h-6 mr-2" />
          <Typography variant="h5" color="blue-gray" className="text-center">
            Paiement sécurisé
          </Typography>
        </div> */}
      </div>
      <Card className="bg-gray-50">
        <List>
          <ListItem onClick={() => setMethod("cash")} className="p-1">
            <label
              htmlFor="vertical-list-react"
              className="flex w-full cursor-pointer items-center px-3 "
            >
              <ListItemPrefix className="mr-3">
                <Radio
                onChange={(e) => console.log(e)}
                  crossOrigin={undefined}
                  name="paiement-method"
                  checked={method === "cash"}
                  id="cash"
                  ripple={false}
                  className="hover:before:opacity-0"
                  containerProps={{
                    className: "p-0",
                  }}
                />
              </ListItemPrefix>
              <div
                color="blue-gray"
                className="font-medium flex justify-between items-center w-full"
              >
                Espèces
                <GiCash className="w-8 h-8" />
                {/* <SiApplepay className="w-8 h-8" /> */}
              </div>
            </label>
          </ListItem>
          <ListItem
            onClick={() => setMethod("credit-card")}
            className=" flex flex-col p-1"
          >
            <label
              htmlFor="vertical-list-vue"
              className="flex w-full cursor-pointer items-center px-3 "
            >
              <ListItemPrefix className="mr-3">
                <Radio
                onChange={(e) => console.log(e)}
                  crossOrigin={undefined}
                  name="paiement-method"
                  id="credit-card"
                  checked={method === "credit-card"}
                  ripple={false}
                  className="hover:before:opacity-0"
                  containerProps={{
                    className: "p-0",
                  }}
                />
              </ListItemPrefix>
              <div
                color="blue-gray"
                className="font-medium flex justify-between items-center w-full"
              >
                Carte bancaire
                <p className="flex justify-between items-center">
                  <BsCreditCard2Front className="w-8 h-8" />
                </p>
              </div>
            </label>
            {/* {method === "credit-card" && (
              <div className="w-full flex justify-between items-center p-2">
                <p>Sauvegarder le mode de paiement</p>
                <Switch
                  checked={saveCreditCard}
                  onChange={() => setSaveCreditCard(!saveCreditCard)}
                  crossOrigin={undefined}
                  color="green"
                  defaultChecked
                />
              </div>
            )} */}
          </ListItem>
          {/* Wallet */}
          {/* <ListItem
            disabled={true}
            onClick={() => setMethod("wallet")}
            className="p-0 flex flex-col"
          >
            <label
              htmlFor="vertical-list-vue"
              className="flex w-full cursor-pointer items-center px-3 "
            >
              <ListItemPrefix className="mr-3">
                <Radio
                
                onChange={(e) => console.log(e)}
                  crossOrigin={undefined}
                  name="paiement-method"
                  id="wallet"
                  checked={method === "wallet"}
                  ripple={false}
                  className="hover:before:opacity-0"
                  containerProps={{
                    className: "p-0",
                  }}
                />
              </ListItemPrefix>
              <div
                color="blue-gray"
                className="font-medium flex justify-between items-center w-full"
              >
                Wallet
                <p className="flex justify-between items-center">
                  <SiApplepay className="w-8 h-8 mx-1" />
                  <FaGooglePay className="w-8 h-8" />
                </p>
              </div>
            </label>
          </ListItem> */}
        </List>
      </Card>
      <div className="p-2">
        <Button
          onClick={() => setValidateCart(true)}
          color="blue"
          fullWidth
        >
          Continuer

        </Button>
      </div>
    </div>
  );
};

export default PaiementMethod;
