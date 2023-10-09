import { vendorOptions } from "@/docs/data";
import Select from "react-select";

const SellerFilterComponent = () => {
  return (
    <div>
      <h3>Trier par vendeur</h3>
      <Select
        defaultValue={[vendorOptions[2], vendorOptions[3]]}
        isMulti
        name="colors"
        options={vendorOptions}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    </div>
  );
};

export default SellerFilterComponent;