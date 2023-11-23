import React, { useState } from "react";
import {
  Radio,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  Typography,
  Switch,
} from "@material-tailwind/react";
import { SiApplepay } from "react-icons/si";
import { BsCreditCard2Front } from "react-icons/bs";
import { RiSecurePaymentLine } from "react-icons/ri";
import { GrSecure } from "react-icons/gr";
import { GiCash } from "react-icons/gi";


type PaiementMethodProps = {
  method: string;
  setMethod: React.Dispatch<React.SetStateAction<"cash" | "credit-card">>;
};
const PaiementMethod = ({ method, setMethod }: PaiementMethodProps) => {
  const [saveCreditCard, setSaveCreditCard] = useState(true);

  return (
    <div>
      <Card className="bg-gray-50">
        <List>
          <ListItem onClick={() => setMethod("cash")} className="p-0">
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
              <Typography
                color="blue-gray"
                className="font-medium flex justify-between items-center w-full"
              >
                Espèces
                <GiCash className="w-8 h-8" />
                {/* <SiApplepay className="w-8 h-8" /> */}
              </Typography>
            </label>
          </ListItem>
          <ListItem
            onClick={() => setMethod("credit-card")}
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
                  id="credit-card"
                  checked={method === "credit-card"}
                  ripple={false}
                  className="hover:before:opacity-0"
                  containerProps={{
                    className: "p-0",
                  }}
                />
              </ListItemPrefix>
              <Typography
                color="blue-gray"
                className="font-medium flex justify-between items-center w-full"
              >
                Carte bancaire
                <div className="flex justify-between items-center">
                  <BsCreditCard2Front className="w-8 h-8" />
                  <RiSecurePaymentLine className="w-8 h-8" />
                </div>
              </Typography>
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
        </List>
      </Card>
    </div>
  );
};

export default PaiementMethod;
