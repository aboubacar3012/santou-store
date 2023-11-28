import { getCategories } from "@/services/categories";
import { CategoryType } from "@/types/category.type";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

const categoriesData = [
  { name: "Branding National", color: "orange", bgColor: "green" },
  { name: "Chaussure traditionnelle", color: "green", bgColor: "green" },
  { name: "Le Leppi", color: "red", bgColor: "red" },
  { name: "Association GAM", color: "blue", bgColor: "blue" },
  // { name: "Sacs", color: "yellow", bgColor: "yellow" },
  // { name: "Autres", color: "purple", bgColor: "purple" },
];

const colors = ["green", "red", "blue", "yellow", "purple"];
const bgColors = ["green", "red", "blue", "yellow", "purple"];

const CategoryFilterComponent = () => {
  const { data, isLoading, isFetching, error, isError } = useQuery({
    queryKey: ["categories"], // une clé simple car on récupère tous les todos
    queryFn: getCategories, // la fonction qui va retourner les données
    refetchOnWindowFocus: false, // ne pas rafraîchir la requête quand on focus la fenêtre
    retry: false, // ne pas réessayer la requête en cas d'erreur
    staleTime: 1000 * 60 * 5, // la requête est considérée comme périmée après 5 minutes
  });

  
  
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category:any) => {
    setSelectedCategory(category);
  };

  if (isLoading && isFetching) return <div>Loading...</div>;
  if (isError) return <div>Erreur lors du chargement des produits</div>;

  if (data.categories.length === 0) return <div>Aucun produit</div>;

  return (
    <div>
      <h4 className="font-semibold mt-1">Categories</h4>
      <div className="flex items-center justify-between overflow-y-scroll">
        {/* Tout afficher */}
        <div
          className={`px-3 py-1 my-1 rounded-lg text-gray-600 bg-gray-100 border-gray-100 cursor-pointer ${
            selectedCategory === null ? "border border-green-900" : ""
          }`}
          onClick={() => handleCategoryClick(null)}
          style={{ whiteSpace: "nowrap" }}
        >
          <p className="text-sm mt-1">Tout afficher</p>
        </div>
        {data && data.categories && data.categories.map((category:CategoryType, index:number) => (
          <div
            key={index}
            className={`px-3 py-1 my-1 rounded-lg text-${category.color ?? colors[index]}-600 bg-gray-100 border-gray-100 cursor-pointer ${
              selectedCategory === category ? "border border-green-900" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
            style={{ whiteSpace: "nowrap" }}
          >
            <p className="text-sm mt-1">{category.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilterComponent;
