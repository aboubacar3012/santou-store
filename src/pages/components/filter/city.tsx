import Select from "react-select";
import { cityOptions } from "../../docs/data";

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
