import EventListComponent from "../../components/order/order-list";
import FilterComponent from "../../components/filter/filter";
import ProductListComponent from "../../components/product/product-list";

const HomeScreenPage = () => {
  return (
    // <div className="p-3 space-y-4 z-0 h-screen">
    <div>
      <FilterComponent />
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">Branding National</h4>
        <button className="text-sm font-semibold text-gray-500 hover:text-gray-700">
          Voir tout
        </button>
      </div>
      <hr className="" />
      <ProductListComponent />
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">Branding National</h4>
        <button className="text-sm font-semibold text-gray-500 hover:text-gray-700">
          Voir tout
        </button>
      </div>
      <hr className="" />
      <ProductListComponent />
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">Branding National</h4>
        <button className="text-sm font-semibold text-gray-500 hover:text-gray-700">
          Voir tout
        </button>
      </div>
      <hr className="" />
      <ProductListComponent />
      {/* <EventListComponent /> */}
    </div>
  );
};

export default HomeScreenPage;
