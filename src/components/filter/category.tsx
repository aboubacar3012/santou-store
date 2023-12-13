import { updateControl } from "@/redux/features/controlsSlice";
import { updateCategory } from "@/redux/features/filterSlice";
import { getProductCategories } from "@/services/productCategories";
import { CategoryType } from "@/types/category.type";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-scroll";


const categoriesData = [
  { name: "Branding National", color: "orange", bgColor: "green" },
  { name: "Chaussure traditionnelle", color: "green", bgColor: "green" },
  { name: "Le Leppi", color: "red", bgColor: "red" },
  { name: "Association GAM", color: "blue", bgColor: "blue" },
  // { name: "Sacs", color: "yellow", bgColor: "yellow" },
  // { name: "Autres", color: "purple", bgColor: "purple" },
];

const colors = ["green", "red", "blue", "yellow", "purple", "orange"];
const bgColors = ["green", "red", "blue", "yellow", "purple"];

const CategoryFilterComponent = () => {
  const { data, isLoading, isFetching, error, isError } = useQuery({
    queryKey: ["categories"], // une clé simple car on récupère tous les todos
    queryFn: getProductCategories, // la fonction qui va retourner les données
    refetchOnWindowFocus: false, // ne pas rafraîchir la requête quand on focus la fenêtre
    retry: false, // ne pas réessayer la requête en cas d'erreur
    staleTime: 1000 * 60 * 5, // la requête est considérée comme périmée après 5 minutes
  });

  const dispatch = useDispatch();

  
  
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryClick = (category:any) => {
    setSelectedCategory(category);
    console.log({category})
  };

  useEffect(() => {
    dispatch(updateCategory("all"));
    setSelectedCategory("all");
  }, []);

  useEffect(() => {
    if(isLoading && isFetching) dispatch(updateControl({spinner: true}));
    else dispatch(updateControl({spinner: false}));

  }, [isLoading, isFetching]);

  if (isLoading && isFetching) return <div>Chargement des produits...</div>;
  if (isError) return <div>Erreur lors du chargement des produits</div>;

  if (data.categories.length === 0) return <div>Aucun produit</div>;

  return (
    <div>
      <h4 className="font-semibold mt-1">Categories</h4>
      <div className="flex items-center justify-between overflow-y-scroll">
        {/* Tout afficher */}
        <div

          className={`px-3 py-1 my-1 rounded-lg text-gray-600 bg-gray-100 border-gray-100 cursor-pointer ${
            selectedCategory === "all" ? "border border-green-900" : ""
          }`}
          onClick={() => {
            handleCategoryClick("all");
            dispatch(updateCategory("all"));
          }}
          style={{ whiteSpace: "nowrap" }}
        >
          <p className="text-sm mt-1">Tout afficher</p>
        </div>
        {data && data.categories && data.categories.map((category:CategoryType, index:number) => (
          <div
            key={index}
            className={`px-3 py-1 my-1 rounded-lg text-${category.color ?? colors[index]}-600 bg-gray-100 border-gray-100 cursor-pointer ${
              selectedCategory === category.name.toLowerCase() ? "border border-green-900" : ""
            }`}
            onClick={() => {
              handleCategoryClick(category.name.toLowerCase());
              dispatch(updateCategory(category.name.toLowerCase()));
            }}
            style={{ whiteSpace: "nowrap" }}
          >
            <p className="text-sm mt-1">Nos {category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilterComponent;

