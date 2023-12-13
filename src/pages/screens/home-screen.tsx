import EventListComponent from "../../components/order/order-list";
import FilterComponent from "../../components/filter/filter";
import ProductListComponent from "../../components/product/product-list";
import ProductByCategory from "@/components/product/product-by-categorie";
import RiderHomeComponent from "@/components/rider/rider-home-screen";
import HomeScreenCarousel from "@/components/shared/homeScreenCarousel";
import CallToVisiteMenu from "@/components/shared/callToVisiteMenu";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/router";

const HomeScreenPage = () => {
  const router = useRouter();

  const handleVisiteMenu = () => {
    router.push("/afrograille?mode=delivery");
  }
  return (
    // <div className="p-3 space-y-4 z-0 h-screen">
    <div>
      {/* <FilterComponent /> */}
      {/* <ProductListComponent /> */}
      {/* <ProductByCategory /> */}
    
     {/* <RiderHomeComponent /> */}
     <HomeScreenCarousel />
     <div className="p-2">
     <Button onClick={handleVisiteMenu} fullWidth  color="blue" className="flex items-center gap-2 justify-center py-4">
            <span>Visitez notre menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
              />
            </svg>
          </Button>
     </div>
     <CallToVisiteMenu />
    </div>
  );
};

export default HomeScreenPage;