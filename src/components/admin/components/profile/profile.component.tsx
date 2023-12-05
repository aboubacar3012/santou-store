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
  Select,
  Option,
  Switch,
} from "@material-tailwind/react";
import { mockRestaurantInfo } from "@/docs/mockRestaurantInfo";
import { RootState } from "@/redux/store";
import { useQueryClient } from "@tanstack/react-query";

const hours = [
  "00:15",
  "00:30",
  "00:45",
  "01:00",
  "01:15",
  "01:30",
  "01:45",
  "02:00",
  "02:15",
  "02:30",
  "02:45",
  "03:00",
  "03:15",
  "03:30",
  "03:45",
  "04:00",
  "04:15",
  "04:30",
  "04:45",
  "05:00",
  "05:15",
  "05:30",
  "05:45",
  "06:00",
  "06:15",
  "06:30",
  "06:45",
  "07:00",
  "07:15",
  "07:30",
  "07:45",
  "08:00",
  "08:15",
  "08:30",
  "08:45",
  "09:00",
  "09:15",
  "09:30",
  "09:45",
  "10:00",
  "10:15",
  "10:30",
  "10:45",
  "11:00",
  "11:15",
  "11:30",
  "11:45",
  "12:00",
  "12:15",
  "12:30",
  "12:45",
  "13:00",
  "13:15",
  "13:30",
  "13:45",
  "14:00",
  "14:15",
  "14:30",
  "14:45",
  "15:00",
  "15:15",
  "15:30",
  "15:45",
  "16:00",
  "16:15",
  "16:30",
  "16:45",
  "17:00",
  "17:15",
  "17:30",
  "17:45",
  "18:00",
  "18:15",
  "18:30",
  "18:45",
  "19:00",
  "19:15",
  "19:30",
  "19:45",
  "20:00",
  "20:15",
  "20:30",
  "20:45",
  "21:00",
  "21:15",
  "21:30",
  "21:45",
  "22:00",
  "22:15",
  "22:30",
  "22:45",
  "23:00",
  "23:15",
  "23:30",
  "23:45",
  "00:00",
];
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

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-full h-full flex-col flex overflow-y-scroll mx-10 ">
        <CardBody className="text-center overflow-x-scroll h-screen">
          <div className="relative w-full h-96">
            <input
              type="file"
              ref={hiddenFileInput}
              onChange={handleChange}
              style={{ display: "none" }}
            />
            <button
              onClick={() => hiddenFileInput?.current?.click()}
              className="absolute inset-0 bg-black bg-opacity-50 flex flex-col text-white h-full w-full align-middle items-center justify-center cursor-pointer"
              style={{ zIndex: 10, borderRadius: 10 }}
            >
              <MdUpload style={{ width: 50, height: 50 }} />
              <Typography>Inserer une nouvelle image</Typography>
            </button>
          </div>

          <div className="flex flex-col my-2">
            <Input
              label="Nom du restaurant"
              // value={restaurantInfo.name}
              // disabled={!isEditMode}
              crossOrigin={undefined}
            />
          </div>

          <div className="flex flex-col my-2">
            <Input
              label="Spécialité"
              // value={restaurantInfo.speciality}
              // disabled={!isEditMode}
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
            <h2>Utiliser react select pour les pastilles existantes</h2>
            <h2>
              Ajouter un button ajouter une pastille, pour les nouveau pastilles
            </h2>
          </div>

          <div className="my-2">
            <Textarea
              className="mb-2"
              size="lg"
              label="Description"
              // value={restaurantInfo.description}
              // disabled={!isEditMode}
            />
          </div>

          <div className="flex flex-col">
            <Input
              label="Numéro de téléphone: ex. +224623456782"
              // value={restaurantInfo.phone_number}
              // disabled={!isEditMode}
              crossOrigin={undefined}
            />
          </div>

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
                // value={restaurantInfo.gps_coordinates.latitude}
                // disabled={!isEditMode}
                crossOrigin={undefined}
              />
            </div>
            <div>
              <Input
                label="Longitude"
                // value={restaurantInfo.gps_coordinates.longitude}
                // disabled={!isEditMode}
                crossOrigin={undefined}
                className=""
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
          </div>
          <div className="flex justify-between gap-2 items-center w-full">
            <Typography
              color="blue-gray"
              className="font-bold mb-1 text-left"
              textGradient
            >
              Lundi
            </Typography>
            <div className="flex flex-col gap-2">
              <Select label="Heure d'ouverture">
                {hours.map((hourOption, index) => (
                  <Option key={index} value={hourOption}>
                    {hourOption}
                  </Option>
                ))}
              </Select>
              <Select label="Heure de fermeture">
                {hours.map((hourOption, index) => (
                  <Option key={index} value={hourOption}>
                    {hourOption}
                  </Option>
                ))}
              </Select>
            </div>
            <label
              className="relative flex items-center p-3 rounded-full cursor-pointer"
              htmlFor="ripple-on"
              data-ripple-dark="true"
            >
              <input
                id="ripple-on"
                type="checkbox"
                className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
              />
              <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  stroke="currentColor"
                  stroke-width="1"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </span>
            </label>
          </div>

          <div className="mt-10">
            <Button fullWidth>Enregistrer</Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProfilePage;
