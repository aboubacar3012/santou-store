import { cityOptions } from "@/docs/data";
import Select from "react-select";

const CityFilterComponent = () => {
  return (
    <div>
      <h3>Trier par ville</h3>
      <Select
        defaultValue={[cityOptions[2], cityOptions[3]]}
        isMulti
        name="colors"
        options={cityOptions}
        className="basic-multi-select"
        classNamePrefix="select"
      />
    </div>
  );
};

export default CityFilterComponent;
