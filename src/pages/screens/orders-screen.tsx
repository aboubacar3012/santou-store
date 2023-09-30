import OrderListComponent from "../components/order/order-list";
import EventListComponent from "../components/order/order-list";
import UnavailableComponent from "../components/unavailable";
const OrdersScreenPage = () => {
  return (
    <>
      <div className="flex mt-3 items-center justify-center">
        <div className="flex items-center space-x-2 p-1 border border-blue-600 dark:border-blue-400 rounded-xl">
          <button className="px-4 py-2 text-sm font-medium text-white capitalize bg-blue-600 md:py-3 rounded-xl md:px-12">
            Commandes en cours
          </button>
          <button className="px-4 py-2 text-sm font-medium text-blue-600 capitalize transition-colors duration-300 md:py-3 dark:text-blue-400 dark:hover:text-white focus:outline-none hover:bg-blue-600 hover:text-white rounded-xl md:px-12">
            Commandes terminées
          </button>
        </div>
      </div>
      <OrderListComponent />
      {/* <UnavailableComponent /> */}
    </>
  );
};

export default OrdersScreenPage;
