"use client";

import Image from "next/image";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Schedule from "./schedules.component";
import {
  MdModeEdit,
  MdInfoOutline,
  MdEditOff,
  MdUpload,
  MdAddCircleOutline,
} from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Tooltip,
  Chip,
  IconButton,
  Checkbox,
  Textarea,
  Button,
} from "@material-tailwind/react";
import { mockRestaurantInfo } from "@/docs/mockRestaurantInfo";
import { RootState } from "@/redux/store";
import { useQueryClient } from "@tanstack/react-query";
const ProfilePage = () => {
  // Access the client
  const queryClient = useQueryClient();
  const restaurantInfo = mockRestaurantInfo;

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const isTablet = false;
  // const userInfos = useSelector((state: RootState) => state.userInfos);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files != null && files.length > 0) {
      const file = files[0];
      console.log(file);
    }
  };
  useEffect(() => {}, []);

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-full h-full flex-col flex overflow-y-scroll mx-10 ">
        <div className="flex justify-end mt-2">
          <Tooltip
            content={isEditMode ? "Désactiver l'édition" : "Activer l'édition"}
            placement="left"
          >
            <IconButton
              className="mx-2"
              onClick={() => setIsEditMode(!isEditMode)}
            >
              {!isEditMode ? (
                <MdModeEdit style={{ width: 20, height: 20 }} />
              ) : (
                <MdEditOff style={{ width: 20, height: 20 }} />
              )}
            </IconButton>
          </Tooltip>
        </div>
        {/* {!isTablet && (
          <CardHeader
            floated={false}
            className=" flex p-1 mt-5 align-center h-auto justify-center"
          >
            
          </CardHeader>
        )} */}

        <CardBody className="text-center overflow-x-scroll h-screen">
          <div className="relative w-full h-96">
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={handleChange}
              style={{ display: "none" }}
            />
            {/* <Image
                style={{ borderRadius: 10, zIndex: 0 }}
                fill
                src={'/placeholderResto.jpg'}
                alt={'Banière restaurant'}
              /> */}
            <img
              src="https://images.unsplash.com/photo-1494390248081-4e521a5940db?q=80&w=2006&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Banière restaurant"
              className="w-full h-full object-cover rounded-lg"
            />

            {isEditMode && (
              <button
                onClick={() => hiddenFileInput?.current?.click()}
                className="absolute inset-0 bg-black bg-opacity-50 flex flex-col text-white h-full w-full align-middle items-center justify-center cursor-pointer"
                style={{ zIndex: 10, borderRadius: 10 }}
              >
                <MdUpload style={{ width: 50, height: 50 }} />
                <Typography>Inserer une nouvelle image</Typography>
              </button>
            )}
          </div>
          <div className="flex flex-col">
            <div className="flex justify-start">
              <Typography
                color="blue-gray"
                className="font-bold mb-1 text-left"
                textGradient
              >
                Modes de commande
              </Typography>
            </div>
            <div className="flex h-auto justify-center">
              {restaurantInfo.modes.map((mode, key) => (
                <div key={key} className="mx-2 flex flex-col">
                  <Typography
                    color="blue-gray"
                    className="font-light"
                    textGradient
                  >
                    {mode}
                  </Typography>
                  <Checkbox
                    color="blue"
                    disabled={!isEditMode}
                    className="mt-0"
                    crossOrigin={undefined}
                    checked={true}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <Typography
              color="blue-gray"
              className="font-bold mb-1 text-left"
              textGradient
            >
              Nom du restaurant
            </Typography>
            <Input
              label="Nom du restaurant"
              value={restaurantInfo.name}
              disabled={!isEditMode}
              crossOrigin={undefined}
            />
          </div>

          <div className="flex flex-col mt-1">
            <Typography
              color="blue-gray"
              className="font-bold mb-1 text-left"
              textGradient
            >
              Spécialité
            </Typography>
            <Input
              label="Spécialité"
              value={restaurantInfo.speciality}
              disabled={!isEditMode}
              crossOrigin={undefined}
            />
          </div>

          <div className="flex flex-col mt-1">
            <div className="justify-start">
              <Typography
                color="blue-gray"
                className="font-bold mb-1 text-left"
                textGradient
              >
                Pastilles
              </Typography>
            </div>
            {!isEditMode ? (
              <div className="flex overflow-x-scroll h-10">
                {restaurantInfo.tags.map((tag, key) => (
                  <div key={key} className="mx-2">
                    <Chip color="green" value={tag} />
                  </div>
                ))}
              </div>
            ) : (
              <div>
                <Input
                  label="Inserez des pastilles séparées par une virgule"
                  crossOrigin={undefined}
                ></Input>
              </div>
            )}
          </div>

          <div>
            <Typography
              color="blue-gray"
              className="font-bold mb-2 text-left"
              textGradient
            >
              Description
            </Typography>
            <Textarea
              className="mb-2"
              size="lg"
              label="Description"
              value={restaurantInfo.description}
              disabled={!isEditMode}
            />
          </div>

          {restaurantInfo.phone_number && (
            <div className="flex flex-col">
              <Typography
                color="blue-gray"
                className="font-bold mb-2 text-left"
                textGradient
              >
                Numéro de téléphone
              </Typography>

              <Input
                label="Numéro de téléphone (optionnel)"
                value={restaurantInfo.phone_number}
                disabled={!isEditMode}
                crossOrigin={undefined}
              />
            </div>
          )}

          <hr className="my-3" />

          <div className="flex flex-col">
            <Typography
              color="blue-gray"
              className="font-bold mb-2 text-left"
              textGradient
            >
              Coordonnées GPS
            </Typography>
            <div className="mb-5">
              <Input
                label="Latitude"
                value={restaurantInfo.gps_coordinates.latitude}
                disabled={!isEditMode}
                crossOrigin={undefined}
              />
            </div>
            <div>
              <Input
                label="Longitude"
                value={restaurantInfo.gps_coordinates.longitude}
                disabled={!isEditMode}
                crossOrigin={undefined}
                className="mt-2"
              />
            </div>
          </div>

          <hr className="my-3 mt-5" />

          <div className="flex flex-col">
            <Typography
              color="blue-gray"
              className="font-bold mb-1 text-left"
              textGradient
            >
              Horaires d&apos;ouvertures
            </Typography>
            <div className="flex">
              <MdInfoOutline className="inline-block w-5 h-5 mr-2" />
              <Typography
                color="blue-gray"
                className="font-light mb-1 text-left"
                textGradient
              >
                Supprimez un horaire pour indiquer le restaurant fermé
              </Typography>
            </div>
          </div>
          {restaurantInfo.hours.map((hour_data, key) => (
            <Schedule
              key={key}
              day={hour_data.day}
              start={hour_data.start}
              end={hour_data.end}
              isEditMode={isEditMode}
              restaurantInfo={restaurantInfo}
            />
          ))}
          {isEditMode && (
            <Tooltip content={"Ajouter un horaire"} placement={"bottom"}>
              <IconButton size="lg" onClick={() => console.log("adding entry")}>
                <MdAddCircleOutline style={{ width: 20, height: 20 }} />
              </IconButton>
            </Tooltip>
          )}
        </CardBody>
        <CardFooter className="flex justify-center">
          <Button disabled={!isEditMode}>Enregistrer les modifications</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfilePage;
