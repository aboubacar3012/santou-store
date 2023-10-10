import EventListComponent from "../../components/order/order-list";
import FilterComponent from "../../components/filter/filter";
import ProductListComponent from "../../components/product/product-list";
import ProductByCategory from "@/components/product/product-by-categorie";

const HomeScreenPage = () => {
  return (
    // <div className="p-3 space-y-4 z-0 h-screen">
    <div>
      <FilterComponent />
     
      
      {/* <ProductListComponent /> */}
      <ProductByCategory />
    
      {/* <EventListComponent /> */}
    </div>
  );
};

export default HomeScreenPage;
