import EventListComponent from "../components/event/event-list";
import FilterComponent from "../components/filter/filter";
import ProductListComponent from "../components/product/product-list";

const HomeScreenPage = () => {
  return (
    <div className="p-3 space-y-4 z-0 h-screen">
      {/* <FilterComponent /> */}
      <ProductListComponent />
      <EventListComponent />
    </div>
  );
};

export default HomeScreenPage;
