import {
  Button,
  Card,
  Checkbox,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { MdInfoOutline, MdOutlineFastfood } from "react-icons/md";
import AddOption from "./addOption";

const AddArticleForm = () => {
  const [openAddOptionDialog, setOpenAddOptionDialog] = useState(false);
  const [isAddingValue, setIsAddingValue] = useState(false);

  const handleAddStoreOption = () => {
    // mutation.mutate(categoryToAdd);
    // setOpenAddCategoryDialog(false);
  }

  const handleOpenAddOptionDialog = () => setOpenAddOptionDialog((cur) => !cur);
  return (
    <div className="flex flex-col items-center max-h-screen ">
      <div className="w-full flex-col flex  mx-10 align-middle ">
        <div className="flex align-middle items-center justify-center p-1 mt-5">
          <MdOutlineFastfood
            className="mr-1"
            style={{ width: 30, height: 30 }}
          />
          <Typography variant="h4">Nouvel article</Typography>
        </div>
        <hr className="my-3" />
        <div className="px-2">
          <div className="flex flex-col my-2">
            <h1>Photo de l&apos;article</h1>
          </div>

          <div className="flex flex-col my-2">
            <Input
              // disabled={true}
              label="Nom du l'article"
              // value={storeName}
              // onChange={(e) => setStoreName(e.target.value)}
              crossOrigin={undefined}
            />
          </div>
          <div className="flex flex-col my-2">
            <Input
              type="number"
              // disabled={true}
              label="Prix de l'article"
              // value={storeName}
              // onChange={(e) => setStoreName(e.target.value)}
              crossOrigin={undefined}
            />
          </div>
          <div className="flex flex-col my-2">
            <Textarea
              minLength={3}
              maxLength={30}
              required
              label="Veuillez rédiger une description correcte de l'article"
            />
          </div>
          <div className="flex flex-col my-2">
            <h1>Categorie de l&apos;article</h1>
          </div>
          <hr className="my-3" />
          <div className=" max-h-96 flex flex-col space-y-3 ">
            <Typography className="font-bold">Liste des Options</Typography>
            <div className="flex">
              <MdInfoOutline className="inline-block w-5 h-5 mr-2" />
              <Typography
                color="blue-gray"
                className="font-light mb-1 text-left"
                textGradient
              >
                Veuillez cocher les options pour cet article
              </Typography>
            </div>
            <div className="overflow-y-auto space-y-5 h-30">
              <Card
                // key={key}
                className="flex flex-col justify-between p-3 text-white "
                color="gray"
                variant="gradient"
              >
                <Checkbox
                  // onClick={() => {
                  //   handleOptionSelection(option);
                  // }}
                  color="blue"
                  label={
                    <Typography className="text-white font-bold">
                      Boissons
                    </Typography>
                  }
                  crossOrigin={undefined}
                />
                <div className="flex justify-between">
                  <Typography>Minimum de valeurs a sélectionner</Typography>
                  <Typography>1</Typography>
                </div>
                <div className="flex justify-between">
                  <Typography>Maximum de valeurs a sélectionner</Typography>
                  <Typography>2</Typography>
                </div>

                <hr className="my-1" />
                <div
                  // key={key}
                  className="flex flex-col justify-between mb-1"
                >
                  <div className="flex justify-between">
                    <Typography>Jus de coca cola</Typography>
                    <Typography>12 €</Typography>
                  </div>
                  <div className="flex justify-between">
                    <Typography>Jus de orange</Typography>
                    <Typography>12 €</Typography>
                  </div>
                  <Button
                    color="green"
                    size="sm"
                    onClick={() => {
                      setIsAddingValue(true);
                      handleOpenAddOptionDialog();
                    }}
                  >
                    <Typography className="font-light" variant="small">
                      Ajouter une nouvelle valeur
                    </Typography>
                  </Button>
                </div>
                <hr className="my-1" />
              </Card>
            </div>
            <Button
              color="blue"
              size="md"
              onClick={() => {
                setIsAddingValue(false);
                handleOpenAddOptionDialog();
              }}
            >
              <Typography  variant="small">Créer une nouvelle option</Typography>
            </Button>
          </div>
        </div>
      </div>
      <AddOption isAddingValue={isAddingValue} optionId={"12345"} openAddOptionDialog={openAddOptionDialog} handleOpenAddOptionDialog={handleOpenAddOptionDialog} />
    </div>
  );
};

export default AddArticleForm;
