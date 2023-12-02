import { RootState } from "@/redux/store";
import { getOrdersService } from "@/services/orders";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Mode } from "./components/mode";
import { OrdersAccordion } from "./components/orders-accordion";
import Statistics from "./components/statistics";
import DateFilterComponent from "./components/filterByDate";
import { useQuery } from "@tanstack/react-query";
import { OrderType } from "@/types/order.type";
import Select from 'react-select';
import { getOpenValueStatus } from "@/utils/ordersFunc";
import { logout } from "@/redux/features/authSlice";

type Order = { value: string; label: string };
export const Orders = () => {
  const auth = useSelector((state: RootState) => state.auth);
  const token = auth.token;
  const [selectedSearchOrder, setSelectedSearchOrder] = useState<Order | null>(
    null
  );
  const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  const [open, setOpen] = useState(0);
  const [showOrderDialog, setShowOrderDialog] = useState(false);

  const dispatch = useDispatch();

  const { data, isLoading, isFetching, error, isError, fetchStatus } = useQuery({
    queryKey: ["orders"], // une clé simple car on récupère tous les todos
    queryFn: () => getOrdersService(token), // la fonction qui va retourner les données
    refetchInterval: 1000 * 60 * 1, // rafraîchir les données toutes les minutes
    refetchOnWindowFocus: true, // rafraîchir la requête quand on focus la fenêtre
    refetchOnMount: true, // rafraîchir la requête au montage du composant
    retry: false, // ne pas réessayer la requête en cas d'erreur
    staleTime: 1000 * 60 * 5, // la requête est considérée comme périmée après 5 minutes
    
  });

  useEffect(() => {
    if(data && data.status === 401) {
      localStorage.removeItem("token");
      dispatch(logout())
      window.location.href = "/auth/login";
    }
  }, [data]);

  if (isLoading && isFetching) return <div>Chargement...</div>;
  if (isError) return <div>Erreur lors du chargement des produits</div>;

  if (data && data.orders.length === 0) return <div>Aucun produit</div>;

  
  const getOrdersNumber = () => {
    if(data)
    {
    const result = data.orders.map((order: OrderType) => ({
      value: order.orderNumber,
      label: `Numero ${order.orderNumber} - Nom client: ${order.user.firstName} ${order.user.lastName}`,
    }));
    
    return result;
    }
  }

  const handleSearchOrderChange = (selected: Order | null) => {
    setSelectedSearchOrder(selected);
    const orderValue = selected?.value;
    const order = data && data.orders.find((order:OrderType) => order.orderNumber === orderValue);
    if (order) {
      setOpen(getOpenValueStatus(order.orderStatus));
      setSelectedOrder(order);
      setShowOrderDialog(true);
    }
  };


  
  return (
    <div>
      {/* <Statistics />
      <br/>
      <hr/>
      <br/> */}
    <div className="flex flex-col justify-center items-center w-full md:w-[60rem]">
      {/* <Mode /> */}
      {/* <DateFilterComponent /> */}
      <Select
        className="basic-single p-3 text-sm w-full"
        classNamePrefix="select"
        options={getOrdersNumber()}
        onChange={handleSearchOrderChange}
        value={selectedSearchOrder}
        placeholder="Recherche ..."
      />
      <OrdersAccordion open={open} showOrderDialog={showOrderDialog} setShowOrderDialog={setShowOrderDialog} setOpen={setOpen} orders={data.orders} setSelectedSearchOrder={setSelectedSearchOrder} selectedSearchOrder={selectedSearchOrder} selectedOrder={selectedOrder} setSelectedOrder={setSelectedOrder} />
    </div>
    </div>
  );
};

export default Orders;
