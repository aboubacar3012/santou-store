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

const PaiementMethod = () => {
  const [method, setMethod] = useState<"apple-pay" | "credit-card">(
    "credit-card"
  );
  const [saveCreditCard, setSaveCreditCard] = useState(true);

  return (
    <div>
      <Card className="bg-gray-50">
        <List>
          <ListItem
            disabled
            onClick={() => setMethod("apple-pay")}
            className="p-0"
          >
            <label
              htmlFor="vertical-list-react"
              className="flex w-full cursor-pointer items-center px-3 "
            >
              <ListItemPrefix className="mr-3">
                <Radio
                  crossOrigin={undefined}
                  name="paiement-method"
                  checked={method === "apple-pay"}
                  id="apple-pay"
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
                Apple Pay
                <SiApplepay className="w-8 h-8" />
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
                Carte de crédit
                <div className="flex justify-between items-center">
                  <BsCreditCard2Front className="w-8 h-8" />
                  <RiSecurePaymentLine className="w-8 h-8" />
                  <GrSecure className="w-8 h-8" />
                </div>
              </Typography>
            </label>
            {method === "credit-card" && (
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
            )}
          </ListItem>
        </List>
      </Card>
    </div>
  );
};

export default PaiementMethod;
