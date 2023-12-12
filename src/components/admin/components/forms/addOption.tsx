import { formatPrice } from "@/utils/formatPrice";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { IoMdOptions } from "react-icons/io";

type AddOptionProps = {
  isAddingValue:boolean;
  optionId:string;
  openAddOptionDialog: boolean;
  handleOpenAddOptionDialog: () => void;
};

const AddOption = ({
  isAddingValue,
  optionId,
  openAddOptionDialog,
  handleOpenAddOptionDialog,
}: AddOptionProps) => {
  const [optionToAdd, setOptionToAdd] = useState("");
  const [minOption, setMinOption] = useState(0);
  const [maxOption, setMaxOption] = useState(0);
  const [optionValues, setOptionValues] = useState<
    { name: string; price: number }[]
  >([]);
  const [valueToAdd, setValueToAdd] = useState<string>("");
  const [valuePriceToAdd, setValuePriceToAdd] = useState<number>(0);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if(isAddingValue) setStep(1)
    else setStep(0)
  },[isAddingValue])

  const handleLeftButton = () => {
   if(isAddingValue) return handleOpenAddOptionDialog();
   if(step === 0){
    setOptionToAdd("");
    setMinOption(0);
    setMaxOption(0);
    setOptionValues([]);
    setValueToAdd("");
    setValuePriceToAdd(0);
    setStep(0);
    handleOpenAddOptionDialog();
   }else if(step === 1) setStep(0)
  };

  const handleNext = () => {
    if(step === 0){
      if (optionToAdd.length <= 3)
        return alert("Le nom de l'option doit contenir au moins 3 caractères");
      if (minOption > maxOption)
        return alert("Le minimum doit être inférieur ou égal au maximum");
      setStep(1);
    }else if (step === 1){
      if(isAddingValue){
        console.log({
          optionToAdd, minOption, maxOption
        })
        console.log(optionValues)
      }else if(!isAddingValue){
        console.log(optionId)
        console.log(optionValues)
      }
    }
  };

  const handleAddOptionValue = () => {
    if (valueToAdd.length <= 3)
      return alert("Le nom de la valeur doit contenir au moins 3 caractères");
    if (valuePriceToAdd <= 0) return alert("Le prix doit être supérieur à 0");
    setOptionValues([
      { name: valueToAdd, price: valuePriceToAdd },
      ...optionValues,
    ]);
    setValueToAdd("");
    setValuePriceToAdd(0);
  };

  const handleDeleteOptionValue = (valueName: string) => {
    setOptionValues(
      optionValues.filter((value, key) => value.name != valueName)
    );
  };

  let headerTitle = "";
  if (step === 0) headerTitle = "Création d'une nouvelle option";
  else if (step === 1) headerTitle = "Ajout de valeurs à l'option";

  let buttonTitle = "";
  if (step === 0) buttonTitle = "Suivant";
  else if (step === 1) buttonTitle = "Créer l'option";

  let leftButtonTitle = "";
  if (step === 0) leftButtonTitle = "Annuler";
  else if (step === 1) leftButtonTitle = "Retour";
  return (
    <Dialog
      size="xs"
      open={openAddOptionDialog}
      handler={handleOpenAddOptionDialog}
    >
      <DialogHeader className="space-x-2">
        <IoMdOptions />
        <Typography type="h5">{headerTitle}</Typography>
      </DialogHeader>
      <DialogBody divider>
        {step === 0 && (
          <div className="flex flex-col space-y-5 overflow-y-auto h-60 py-2">
            <Input
              type="text"
              value={optionToAdd}
              onChange={(e) => setOptionToAdd(e.target.value)}
              crossOrigin={undefined}
              label="Nom de l'option"
              size="md"
              required={true}
            />
            <Input
              type="number"
              value={minOption}
              onChange={(e) => setMinOption(Number(e.target.value))}
              crossOrigin={undefined}
              label="Minimum"
              size="md"
              required={true}
            />
            <Input
              type="number"
              value={maxOption}
              onChange={(e) => setMaxOption(Number(e.target.value))}
              crossOrigin={undefined}
              label="Maximum"
              size="md"
              required={true}
            />
          </div>
        )}
        {step === 1 && (
          <div className="flex flex-col space-y-3 h-60 pt-1">
            <Input
              type="text"
              value={valueToAdd}
              onChange={(e) => setValueToAdd(e.target.value)}
              crossOrigin={undefined}
              label="Nom de la valeur"
              size="md"
              required={true}
            />
            <Input
              type="number"
              value={valuePriceToAdd}
              onChange={(e) => setValuePriceToAdd(Number(e.target.value))}
              crossOrigin={undefined}
              label="Prix"
              size="md"
              required={true}
            />
            <Button
              size="sm"
              onClick={handleAddOptionValue}
              variant="gradient"
              color="green"
              type="submit"
            >
              <span>+ Ajouter</span>
            </Button>
            <hr />
            <div className="h-20 overflow-y-auto">
              {optionValues.map((value, key) => (
                <div key={key} className="flex justify-between py-1">
                  <Typography>{value.name}</Typography>
                  <Typography>{formatPrice(value.price)}</Typography>
                  <Button
                    size="sm"
                    onClick={() => handleDeleteOptionValue(value.name)}
                    variant="gradient"
                    color="red"
                    
                  >
                    <span>-</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogBody>
      <DialogFooter>
        <Button
          variant="text"
          color="red"
          onClick={handleLeftButton}
          className="mr-1"
        >
          <span>{leftButtonTitle}</span>
        </Button>
        <Button
          onClick={handleNext}
          variant="gradient"
          color="green"
          type="submit"
        >
          <span>{buttonTitle}</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AddOption;
