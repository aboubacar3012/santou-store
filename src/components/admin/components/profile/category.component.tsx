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
import { addStoreCategoryService, getStoreCategories } from "@/services/storeCategories";
import { StoreCategoryType } from "@/types/storeCategory.type";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
const animatedComponents = makeAnimated();

type CategoryProps = {
  selectedStoreCategories: StoreCategoryType[];
  setSelectedStoreCategories: Dispatch<SetStateAction<StoreCategoryType[]>>;
};


const Category = ({selectedStoreCategories, setSelectedStoreCategories}:CategoryProps) => {
  const [storeCategories, setStoreCategories] = useState<StoreCategoryType[]>([]);
  const [openAddCategoryDialog, setOpenAddCategoryDialog] = useState(false);
  const [categoryToAdd, setCategoryToAdd] = useState("");
  const auth = useSelector((state: RootState) => state.auth);
  const token = auth.token;
  
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching, error, isError, fetchStatus } = useQuery({
    queryKey: ["storeCategories"], // une clé simple car on récupère tous les todos
    queryFn: () => getStoreCategories(), // la fonction qui va retourner les données
    refetchOnMount: true, // rafraîchir la requête au montage du composant
    refetchOnWindowFocus: false, // rafraîchir la requête quand la fenêtre est active

  });

  const mutation = useMutation(
    (categoryName: string) =>
    addStoreCategoryService(categoryName, token),
    {
      onSuccess: (data: any) => {
        if (data.success) {
          queryClient.invalidateQueries(["storeCategories"]);
        } else {
          alert(data.error)
        }
      },
      onError: (error) => {},
    }
  );

  const handleAddStoreCategory = () => {
    mutation.mutate(categoryToAdd);
    setOpenAddCategoryDialog(false);
  }

  useEffect(() => {
    if (data && data.storeCategories) {
      setStoreCategories(data.storeCategories.map((category:StoreCategoryType) => ({ value: category.id, label: category.name, id: category.id })));
    }
  }, [data]);


  const handleOpenAddCategoryDialog = () => setOpenAddCategoryDialog((cur) => !cur);


  if(isLoading) return <div>Chargement...</div>
  if(isError) return <div>Une erreur est survenue</div>
  if(isFetching) return <div>Requête en cours...</div>

  return (
    <div className="flex items-center gap-2">
      <Select
        value={selectedStoreCategories}
        onChange={(value:any) => setSelectedStoreCategories(value)}
        className="basic-single py-3 text-sm w-full"
        classNamePrefix="select"
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={storeCategories}
        placeholder="Choisir les categories"
      />
      <Button color="blue" onClick={handleOpenAddCategoryDialog} className="flex items-center gap-3">+</Button>

      <Dialog
        size="xs"
        open={openAddCategoryDialog}
        handler={handleOpenAddCategoryDialog}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Ajouter une category
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Nom de la category
            </Typography>
            <Input value={categoryToAdd} onChange={(e) => setCategoryToAdd(e.target.value)} crossOrigin={undefined} label="Category" size="lg" />
            
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" color="green" onClick={handleAddStoreCategory} fullWidth>
              Enregistrer
            </Button>
           
          </CardFooter>
        </Card>
      </Dialog>
    </div>
  );
};

export default Category;
