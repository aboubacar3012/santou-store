import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import {
  Button,
  Dialog,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addStoreSpecialityService, getStoreSpecialities } from "@/services/storeSpecialities";
import { StoreSpecialityType } from "@/types/storeSpeciality.type";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
const animatedComponents = makeAnimated();

type SpecialityProps = {
  selectedStoreSpecialities: StoreSpecialityType[];
  setSelectedStoreSpecialities: Dispatch<SetStateAction<StoreSpecialityType[]>>;
};


const Speciality = ({selectedStoreSpecialities, setSelectedStoreSpecialities}:SpecialityProps) => {
  const [storeSpecialities, setStoreSpecialities] = useState<StoreSpecialityType[]>([]);
  const [openAddSpecialityDialog, setOpenAddSpecialityDialog] = useState(false);
  const [specialityToAdd, setSpecialityToAdd] = useState("");
  const auth = useSelector((state: RootState) => state.auth);
  const token = auth.token;
  
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching, error, isError, fetchStatus } = useQuery({
    queryKey: ["storeSpecialities"], // une clé simple car on récupère tous les todos
    queryFn: () => getStoreSpecialities(), // la fonction qui va retourner les données
    refetchOnMount: true, // rafraîchir la requête au montage du composant
    refetchOnWindowFocus: false, // rafraîchir la requête quand la fenêtre est active

  });

  const mutation = useMutation(
    (specialityName: string) =>
    addStoreSpecialityService(specialityName, token),
    {
      onSuccess: (data: any) => {
        if (data.success) {
          queryClient.invalidateQueries(["storeSpecialities"]);
        } else {
          alert(data.error)
        }
      },
      onError: (error) => {},
    }
  );

  const handleAddStoreSpeciality = () => {
    mutation.mutate(specialityToAdd);
    setOpenAddSpecialityDialog(false);
  }

  useEffect(() => {
    if (data && data.storeSpecialities) {
      setStoreSpecialities(data.storeSpecialities.map((speciality:StoreSpecialityType) => ({ value: speciality.id, label: speciality.name, id: speciality.id })));
    }
  }, [data]);


  const handleOpenAddSpecialityDialog = () => setOpenAddSpecialityDialog((cur) => !cur);


  if(isLoading) return <div>Chargement...</div>
  if(isError) return <div>Une erreur est survenue</div>
  if(isFetching) return <div>Requête en cours...</div>

  return (
    <div className="flex items-center gap-2">
      <Select
        value={selectedStoreSpecialities}
        onChange={(value:any) => setSelectedStoreSpecialities(value)}
        className="basic-single py-3 text-sm w-full"
        classNamePrefix="select"
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={storeSpecialities}
        placeholder="Choisir les specialities"
      />
      <Button color="blue" onClick={handleOpenAddSpecialityDialog} className="flex items-center gap-3">+</Button>

      <Dialog
        size="xs"
        open={openAddSpecialityDialog}
        handler={handleOpenAddSpecialityDialog}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Ajouter une speciality
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Nom de la speciality
            </Typography>
            <Input value={specialityToAdd} onChange={(e) => setSpecialityToAdd(e.target.value)} crossOrigin={undefined} label="Speciality" size="lg" />
            
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" color="green" onClick={handleAddStoreSpeciality} fullWidth>
              Enregistrer
            </Button>
           
          </CardFooter>
        </Card>
      </Dialog>
    </div>
  );
};

export default Speciality;
