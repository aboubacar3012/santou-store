import React, { Fragment } from "react";
import CategoryFilterComponent from "./category";
import CityFilterComponent from "./city";
import SellerFilterComponent from "./seller";

const FilterComponent = () => {
  return (
    <Fragment>
      {/* <h4 className="font-semibold">Filter</h4> */}
      <CategoryFilterComponent />
      {/* <CityFilterComponent /> */}
      {/* <SellerFilterComponent /> */}
    </Fragment>
  );
};

export default FilterComponent;
