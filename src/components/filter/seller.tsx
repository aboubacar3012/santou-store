import { vendorOptions } from "@/docs/data";
import { useRouter } from "next/router";
import Select from "react-select";

const SellerFilterComponent = () => {
  const router = useRouter();
  return (
    <div>
      <h3>Trier par vendeur</h3>
      <Select
        defaultValue={[vendorOptions[2]]}
        name="colors"
        options={vendorOptions}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={(e) => {
          router.push("/screens/single-shop-screen");
        }}
      />
    </div>
  );
};

export default SellerFilterComponent;
