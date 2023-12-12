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
import { RiImageEditFill } from "react-icons/ri";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Textarea,
  Button,
  Select,
  Option,
  Checkbox,
  Switch,
} from "@material-tailwind/react";
import { mockRestaurantInfo } from "@/docs/mockRestaurantInfo";
import { RootState } from "@/redux/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Speciality from "./speciality.component";
import Category from "./category.component";
import {
  addRestaurantService,
  getRestaurantByIdService,
  updateRestaurantByIdService,
} from "@/services/store";
import { DayEnum, StoreType } from "@/types/store.type";
import { uploadImageService } from "@/services/uploadImage";
import { StoreCategoryType } from "@/types/storeCategory.type";
import { truncateText } from "@/utils/truncate-text";
import { IoCheckmark } from "react-icons/io5";
import { StoreSpecialityType } from "@/types/storeSpeciality.type";

const hoursMock = [
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

const daysMock = [
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi",
  "Dimanche",
];

const restaurantMock: StoreType = {
  name: "AfroGraille",
  slug: "afro-graille",
};
const ProfilePage = () => {
  const [bannerUrl, setBannerUrl] = useState<string | ArrayBuffer | null>(null);
  const [bannerFile, setBannerFile] = useState<File>();
  const [logoUrl, setLogoUrl] = useState<string | ArrayBuffer | null>(null);
  const [logoFile, setLogoFile] = useState<File>();
  const [storeName, setStoreName] = useState<string>("");
  const [storeSlug, setStoreSlug] = useState<string>("");
  const [storeDescription, setStoreDescription] = useState<string>("");
  const [selectedStoreCategories, setSelectedStoreCategories] = useState<
    StoreCategoryType[]
  >([]);
  const [selectedStoreSpecialities, setSelectedStoreSpecialities] = useState<
    StoreSpecialityType[]
  >([]);
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [hours, setHours] = useState<
    {
      day: DayEnum;
      open: string;
      close: string;
      isActive?: boolean;
    }[]
  >([
    {
      day: DayEnum.Lundi,
      open: "00:00",
      close: "00:00",
    },
    {
      day: DayEnum.Mardi,
      open: "00:00",
      close: "00:00",
    },
    {
      day: DayEnum.Mercredi,
      open: "00:00",
      close: "00:00",
    },
    {
      day: DayEnum.Jeudi,
      open: "00:00",
      close: "00:00",
    },
    {
      day: DayEnum.Vendredi,
      open: "00:00",
      close: "00:00",
    },
    {
      day: DayEnum.Samedi,
      open: "00:00",
      close: "00:00",
    },
    {
      day: DayEnum.Dimanche,
      open: "00:00",
      close: "00:00",
    },
  ]);

  // Access the client
  const queryClient = useQueryClient();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const hiddenBannerFileInput = useRef<HTMLInputElement>(null);
  const hiddenLogoFileInput = useRef<HTMLInputElement>(null);

  // const userInfos = useSelector((state: RootState) => state.userInfos);
  const auth = useSelector((state: RootState) => state.auth);
  const token = auth.token;
  const user = auth.user;
  const storeId = "6572109adeea7b164e9f3c81";

  const { data, isLoading, isFetching, error, isError, fetchStatus } = useQuery(
    {
      queryKey: ["store", storeId], // une clé simple car on récupère tous les todos
      queryFn: () => getRestaurantByIdService(storeId), // la fonction qui va retourner les données
      refetchOnMount: true, // rafraîchir la requête au montage du composant
      refetchOnWindowFocus: false, // rafraîchir la requête quand la fenêtre est active
    }
  );

  const mutation = useMutation(
    (restaurantInfos: StoreType) =>
      updateRestaurantByIdService(storeId, restaurantInfos, token),
    {
      onSuccess: (data: any) => {
        if (data.success) {
          queryClient.invalidateQueries(["store", storeId]);
          // handleConfirmUpload()
        } else {
        }
      },
      onError: (error) => {},
    }
  );

  useEffect(() => {
    if (data && data.success) {
      const restaurantInfo = data.store;
      if (restaurantInfo.storeHours.length > 0)
        setHours(restaurantInfo.storeHours);
      setBannerUrl(restaurantInfo.storeBanner);
      setLogoUrl(restaurantInfo.storeLogo);
      setStoreName(restaurantInfo.name);
      setStoreSlug(restaurantInfo.slug);
      setStoreDescription(restaurantInfo.storeDescription);
      setSelectedStoreCategories(
        restaurantInfo.storeCategories.map((category: StoreCategoryType) => ({
          value: category.id,
          label: category.name,
          id: category.id,
        }))
      );
      setPhone(restaurantInfo.phoneNumbers[0]);
      // setAddress(restaurantInfo.address);
      // setZipCode(restaurantInfo.zipCode);
      // setCity(restaurantInfo.city);
      setEmail(restaurantInfo.email);
      setWebsite(restaurantInfo.website);
    }
  }, [data]);

  const handleConfirmBannerUpload = async () => {
    if (bannerFile) {
      const response = await uploadImageService(
        bannerFile,
        token,
        "afrograille"
      );
      const data = await response;
      return data;
    }
  };

  const handleConfirmLogoUpload = async () => {
      if (logoFile) {
        const response = await uploadImageService(
          logoFile,
          token,
          "afrograille"
        );
        const data = await response;
        return data;
      }
  };

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return alert("No file selected");
    const file = e.target.files[0];
    setBannerFile(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setBannerUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.files) return alert("No file selected");
    const file = e.target.files[0];
    setLogoFile(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      setLogoUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };


  const handleSubmit = async () => {
    let store:StoreType = {
      // storeLogo:bannerUrl.imageUrl,
      // storeBanner: logoUrl.imageUrl,
      name: storeName,
      slug: storeSlug,
      storeDescription: storeDescription,
      // specialities: storeSpecialities,
      storeCategories: selectedStoreCategories.map((category:StoreCategoryType) => category.id),
      storeSpecialities: selectedStoreSpecialities.map((speciality:StoreSpecialityType) => speciality.id),
      phoneNumbers: [phone],
      storeHours: hours,
      // address,
      // zipCode,
      // city,
      email,
      website,
    };
    if (bannerFile){
      const bannerUrl = await handleConfirmBannerUpload();
      store = { ...store, storeBanner: bannerUrl.imageUrl };
    } 
    if (logoFile) {
      const logoUrl = await handleConfirmLogoUpload();
      store = { ...store, storeLogo: logoUrl.imageUrl };
    }
    mutation.mutate(store);
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  if (isFetching) return <div>Fetching...</div>;
  if (!data || !data.success) return <div>No data...</div>;

  console.log(
    bannerUrl,
  );

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-full h-full flex-col flex overflow-y-scroll mx-10 ">
        <CardBody className="text-center overflow-x-scroll h-screen">
          {/* Banner */}
          {!bannerUrl && (
            <div className="relative w-full h-80">
              <input
                type="file"
                ref={hiddenBannerFileInput}
                onChange={handleBannerUpload}
                style={{ display: "none" }}
              />
              <button
                onClick={() => hiddenBannerFileInput?.current?.click()}
                className="absolute inset-0 bg-black bg-opacity-50 flex flex-col text-white h-full w-full align-middle items-center justify-center cursor-pointer"
                style={{ zIndex: 10, borderRadius: 10 }}
              >
                <MdUpload style={{ width: 50, height: 50 }} />
                <Typography>Uploader</Typography>
              </button>
            </div>
          )}
          {bannerUrl && (
            <div className="relative w-full h-80">
              <Image
                src={bannerUrl as string}
                alt="Banner image"
                layout="fill"
                objectFit="cover"
                className="rounded-md"
              />
              <button
                onClick={() => setBannerUrl(null)}
                className="absolute inset-0 flex flex-col text-white  items-end justify-start cursor-pointer p-2"
                style={{ zIndex: 10, borderRadius: 10 }}
              >
                <RiImageEditFill
                  className="text-blue-500 rounded-2xl"
                  style={{ width: 50, height: 50 }}
                />
              </button>
            </div>
          )}
          <br />
          <hr />
          {/* Logo */}
          <div className="flex flex-col justify-center items-center">
            {!logoUrl && (
              <div className="relative w-28 h-28 mt-2">
                <input
                  type="file"
                  ref={hiddenLogoFileInput}
                  onChange={handleLogoUpload}
                  style={{ display: "none" }}
                />
                <button
                  onClick={() => hiddenLogoFileInput?.current?.click()}
                  className="absolute inset-0 bg-black bg-opacity-50 flex flex-col text-white h-full w-full align-middle items-center justify-center cursor-pointer"
                  style={{ zIndex: 10, borderRadius: 100 }}
                >
                  <MdUpload style={{ width: 50, height: 50 }} />
                  <Typography>Uploader</Typography>
                </button>
              </div>
            )}
            {logoUrl && (
              <div className="relative w-28 h-28 mt-2">
                <Image
                  src={logoUrl as string}
                  alt="Banner image"
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
                <button
                  onClick={() => setLogoUrl(null)}
                  className="absolute inset-0 flex flex-col text-white  items-center justify-center cursor-pointer p-2"
                  style={{ zIndex: 10, borderRadius: 100 }}
                >
                  <RiImageEditFill
                    className="text-blue-800 rounded-2xl"
                    style={{ width: 30, height: 30 }}
                  />
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-col my-2">
            <Input
              // disabled={true}
              label="Nom du restaurant"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              crossOrigin={undefined}
            />
          </div>
          <div className="flex flex-col my-2">
            <Input
              // disabled={true}
              label="Slug"
              value={storeSlug}
              onChange={(e) => setStoreSlug(e.target.value)}
              crossOrigin={undefined}
            />
          </div>
          <div className="flex flex-col my-2">
            <Input
              // disabled={true}
              label="E-mail"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              crossOrigin={undefined}
            />
          </div>
          <div className="flex flex-col my-2">
            <Input
              type="url"
              label="Website"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              crossOrigin={undefined}
            />
          </div>

          <div className="flex flex-col my-2">
            <Input
              crossOrigin={undefined}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              label="Adresse"
            />
          </div>
          <div className="flex flex-col my-2">
            <Input
              crossOrigin={undefined}
              value={city}
              onChange={(e) => setCity(e.target.value)}
              type="text"
              label="City"
            />
          </div>
          <div className="flex flex-col  my-2">
            <Input
              crossOrigin={undefined}
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              type="text"
              label="Code postal"
            />
          </div>
          <div className="flex flex-col mt-1">
            <div className="justify-start">
              <Typography
                color="blue-gray"
                className="font-bold mb-1 text-left"
                textGradient
              >
                Specialités
              </Typography>
            </div>
            <Speciality selectedStoreSpecialities={selectedStoreSpecialities} setSelectedStoreSpecialities={setSelectedStoreSpecialities} />
          </div>

          <div className="flex flex-col mt-1">
            <div className="justify-start">
              <Typography
                color="blue-gray"
                className="font-bold mb-1 text-left"
                textGradient
              >
                Categories
              </Typography>
            </div>
            <Category
              setSelectedStoreCategories={setSelectedStoreCategories}
              selectedStoreCategories={selectedStoreCategories}
            />
          </div>

          <div className="my-2">
            <Textarea
              className="mb-2"
              size="lg"
              label="Description"
              value={storeDescription}
              onChange={(e) => setStoreDescription(e.target.value)}
            />
          </div>

          <div className="flex flex-col">
            <Input
              label="Numéro de téléphone: ex. +224623456782"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              crossOrigin={undefined}
            />
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
          {daysMock.map((day, index) => (
            <div
              key={day}
              className="flex justify-between gap-2 items-center w-full mt-2"
            >
              <Typography
                color="blue-gray"
                className="font-bold mb-1 text-left"
                textGradient
              >
                {truncateText(day, 3)}
              </Typography>
              <div className="flex flex-col gap-2">
                <Select
                  disabled={!hours.find((hour) => hour.day === day)?.isActive}
                  value={hours.find((hour) => hour.day === day)?.open}
                  onChange={(value) =>
                    setHours((prev: any) => {
                      console.log(value);
                      const newHours = prev.map((hour: any) => {
                        if (hour.day === day) {
                          return {
                            ...hour,
                            open: value,
                          };
                        }
                        return hour;
                      });
                      return newHours;
                    })
                  }
                  label="Heure d'ouverture"
                >
                  {hoursMock.map((hourOption, index) => (
                    <Option key={index} value={hourOption}>
                      {hourOption}
                    </Option>
                  ))}
                </Select>
                <Select
                  disabled={!hours.find((hour) => hour.day === day)?.isActive}
                  value={hours.find((hour) => hour.day === day)?.close}
                  onChange={(value) =>
                    setHours((prev: any) => {
                      console.log(value);
                      const newHours = prev.map((hour: any) => {
                        if (hour.day === day) {
                          return {
                            ...hour,
                            close: value,
                          };
                        }
                        return hour;
                      });
                      return newHours;
                    })
                  }
                  label="Heure de fermeture"
                >
                  {hoursMock.map((hourOption, index) => (
                    <Option key={index} value={hourOption}>
                      {hourOption}
                    </Option>
                  ))}
                </Select>
              </div>
              <Checkbox
                onChange={(value) =>
                  setHours((prev: any) => {
                    const newHours = prev.map((hour: any) => {
                      if (hour.day === day) {
                        return {
                          ...hour,
                          isActive: !hour.isActive,
                        };
                      }
                      return hour;
                    });
                    return newHours;
                  })
                }
                color="blue"
                checked={hours.find((hour) => hour.day === day)?.isActive}
                crossOrigin={undefined}
              />
            </div>
          ))}

          <div className="mt-10">
            <Button onClick={handleSubmit} fullWidth>
              Enregistrer
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default ProfilePage;
