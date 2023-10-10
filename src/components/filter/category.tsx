import React, { useState } from "react";

const categoriesData = [
  { name: "Branding National", color: "orange", bgColor: "green" },
  { name: "Chaussure traditionnelle", color: "green", bgColor: "green" },
  { name: "Le Leppi", color: "red", bgColor: "red" },
  { name: "Association GAM", color: "blue", bgColor: "blue" },
  // { name: "Sacs", color: "yellow", bgColor: "yellow" },
  // { name: "Autres", color: "purple", bgColor: "purple" },
];

const CategoryFilterComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category:any) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <h4 className="font-semibold mt-1">Categories</h4>
      <div className="flex items-center justify-between overflow-y-scroll">
        {/* Tout afficher */}
        <div
          className={`px-2 py-1 my-1 rounded-lg text-gray-600 bg-gray-100 border-gray-100 cursor-pointer mr-2 ${
            selectedCategory === null ? "border border-green-900" : ""
          }`}
          onClick={() => handleCategoryClick(null)}
          style={{ whiteSpace: "nowrap" }}
        >
          <p className="text-sm mt-1">Tout afficher</p>
        </div>
        {categoriesData.map((category, index) => (
          <div
            key={index}
            className={`px-2 py-1 my-1 rounded-lg text-${category.color}-600 bg-gray-100 border-gray-100 cursor-pointer mr-2 ${
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
