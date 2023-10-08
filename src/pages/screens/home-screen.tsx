import EventListComponent from "../../components/order/order-list";
import FilterComponent from "../../components/filter/filter";
import ProductListComponent from "../../components/product/product-list";

const HomeScreenPage = () => {
  return (
    // <div className="p-3 space-y-4 z-0 h-screen">
    <div>
      {/* <FilterComponent /> */}
      <h4 className="font-semibold p-3">Nos Produits</h4>
      <hr className="" />
      <ProductListComponent />
      {/* <EventListComponent /> */}
    </div>
  );
};

export default HomeScreenPage;
