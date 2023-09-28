import React from "react";
import CategoryFilterComponent from "./category";
import CityFilterComponent from "./city";
import SellerFilterComponent from "./seller";

const FilterComponent = () => {
  return (
    <div>
      <h4 className="font-semibold">Filter</h4>
      <CategoryFilterComponent />
      <CityFilterComponent />
      <SellerFilterComponent />
    </div>
  );
};

export default FilterComponent;
