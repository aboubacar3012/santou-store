import React, { ReactNode } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
  IconButton,
  Chip,
} from "@material-tailwind/react";
import { AiOutlineCloseCircle, AiOutlinePrinter } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import OrderDetail from "./orderDetails";
import {
  OrderType,
  OrderStatusEnum,
  PaymentStatusEnum,
} from "@/types/order.type";
import { truncateText } from "@/utils/truncate-text";
import formatFrenchDate from "../formatDate";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { updateOrderByIdService } from "@/services/orders";
// import html2canvas from 'html2canvas';

type ShowOrderDialogProps = {
  order: OrderType | null;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ShowOrderDialog({
  order,
  open,
  setOpen,
}: ShowOrderDialogProps) {
  const queryClient = useQueryClient();
  const auth = useSelector((state: RootState) => state.auth);
  const token = auth.token;
  const address = `${order?.deliveryAddress?.number}, ${order?.deliveryAddress?.street} ${order?.deliveryAddress?.zipCode} ${order?.deliveryAddress?.city}}`;

  const openGoogleMaps = () => {
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      address
    )}`;
    window.open(googleMapsUrl, "_blank");
  };

  // Fonction pour ouvrir Waze
  const openWaze = () => {
    const wazeUrl = `https://www.waze.com/ul?q=${encodeURIComponent(
      address
    )}&navigate=yes`;
    window.open(wazeUrl, "_blank");
  };

  const mutation = useMutation({
    mutationFn: (newOrder: { orderStatus: OrderStatusEnum }) =>
      updateOrderByIdService(order?.id ?? "", newOrder, token), //
    onSuccess: () => {
      // On vient invalider les queries orders pour provoquer un refetch
      queryClient.invalidateQueries(["orders"]);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleUpdateOrderStatus = (status: OrderStatusEnum) => {
    if (!order) return alert("Aucune commande à modifier");
    let newOrder = {
      orderStatus: status,
    };
    if (status === "DELIVERED") {
      newOrder = {
        orderStatus: status,
        paymentStatus: PaymentStatusEnum.PAID,
      } as any;
    }
    mutation.mutate(newOrder);
    handleOpen();
  };

  const handleOpen = () => {
    setOpen(!open);
  };
  //TODO FIX THIS COMPONENT
  const buttonsByStatus = (status: OrderStatusEnum) => {
    if (status === "PENDING") {
      return (
        <div className="flex flex-wrap justify-between w-full">
          <Button
            // onClick={() => divToImage()}

            size="sm"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            <AiOutlinePrinter className="inline-block  w-4 h-4" />
            Ticket
          </Button>
          <Button
            size="sm"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            onClick={() => handleUpdateOrderStatus(OrderStatusEnum.SHIPPED)}
          >
            <BsCheck2Circle className="inline-block  w-4 h-4" />
            Prête
          </Button>
          <Button
            size="sm"
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            <AiOutlineCloseCircle className="inline-block w-4 h-4" />
            Annuler
          </Button>
        </div>
      );
    } else if (status === "SHIPPED") {
      return (
        <div className="flex justify-center w-full">
          {/* <button
      onClick={() => divToImage()}
      type="button"
      className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
    >
      <AiOutlinePrinter className="inline-block w-5 h-5 mr-2" />
      Réimprimer le ticket
    </button> */}

          <button
            onClick={() => handleUpdateOrderStatus(OrderStatusEnum.DELIVERED)}
            type="button"
            className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            <BsCheck2Circle className="inline-block w-5 h-5 mr-2" />
            Livrée
          </button>
        </div>
      );
    }
    // else if (status === 'planified') {
    //   return <></>;
    // } else if (status === 'done') {
    //   return (
    //     <button
    //       onClick={() => divToImage()}
    //       type="button"
    //       className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-2 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
    //     >
    //       <AiOutlinePrinter className="inline-block w-5 h-5 mr-2" />
    //       Réimprimer le ticket
    //     </button>
    //   );
    // }
  };

  const saveImageToFile = (base64Image: string, fileName: string) => {
    const a = document.createElement("a");
    a.href = base64Image;
    a.download = fileName;
    a.click();
  };

  const divToImage = async () => {
    // const element = document.getElementById('orderBody');
    // if (!element) return;
    // try {
    //   const canvas = await html2canvas(element);
    //   const imageData = canvas.toDataURL('image/png');
    //   saveImageToFile(imageData, 'ticket.png');
    //   console.log('image base64', imageData);
    //   return imageData; // Vous pouvez retourner l'image base64 pour l'utiliser comme nécessaire
    // } catch (error) {
    //   console.error('Erreur lors de la conversion en image base64:', error);
    //   return null;
    // }
  };

  // Appel de la fonction

  // const commandeInfos = order.commandeInfos;
  // const commandeData = order.commandeData;
  // const comment = JSON.parse(commandeInfos.comment);
  // const commentKeys = Object.keys(comment);

  const orderBody = () => {
    return (
      <div id="orderBody" className="px-2 space-y-2 ">
        <div className="text-base leading-relaxed text-gray-500 dark:text-gray-400 flex ">
          <strong className="font-bold mr-2">Paiement:</strong>
          {order?.paymentStatus === "PAID" ? (
            <Chip size="sm" color="green" value="Déjà payé" />
          ) : (
            <Chip size="sm" color="red" value="Non payé" />
          )}
        </div>
        {order && order.createdAt && (
          <div className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          <strong className="font-bold">Commandé le :</strong>{" "}
          {formatFrenchDate(order.createdAt.toString())}
        </div>
        )}
        
        <div className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          <strong className="font-bold">Mode de récupération:</strong>{" "}
          {order?.takingOrder === "DELIVERY" ? "Livraison" : "À emporter"}
        </div>
        <div className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          <p className="font-bold">Commande Numéro: {order?.orderNumber}</p>
        </div>
        {/* Numero telephone */}
        <div className="text-base leading-relaxed text-gray-500  flex justify-start items-center">
          <strong className="font-bold mr-2">Téléphone:</strong>{" "}
          <a href={`tel:${order?.user?.phone}`}>
            <Chip size="md" color="indigo" value={order?.user?.phone ?? "unknown"} icon={<FiPhoneCall className="mt-1" />} />
          </a>
        </div>
        <div className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          <strong className="font-bold">Adresse: </strong> <br />
          {order?.deliveryAddress?.number}, {order?.deliveryAddress?.street}{" "}
          {order?.deliveryAddress?.zipCode} {order?.deliveryAddress?.city}
          <br />
          {order?.deliveryAddress.complement}
          <div className="flex flex items-center gap-4">
          <Button
              onClick={() => openGoogleMaps()}
              size="lg"
              variant="gradient"
              color="orange"
              className="group relative flex items-center gap-3 overflow-hidden pr-[72px]"
            >
              Maps
              <span className="absolute right-0 grid h-full w-12 place-items-center bg-orange-600 transition-colors group-hover:bg-orange-700">
                <img
                  src="https://static.vecteezy.com/system/resources/previews/016/716/478/original/google-maps-icon-free-png.png"
                  alt="metamask"
                  className="h-6 w-6"
                />
              </span>
            </Button>
            <Button
              onClick={() => openWaze()}
              size="lg"
              variant="gradient"
              color="light-blue"
              className="group relative flex items-center gap-3 overflow-hidden pr-[72px]"
            >
              Waze
              <span className="absolute right-0 grid h-full w-12 place-items-center bg-light-blue-600 transition-colors group-hover:bg-light-blue-700">
                <img
                  src="https://upload.wikimedia.org/wikipedia/fr/thumb/0/05/Waze-icon-2020.svg/2048px-Waze-icon-2020.svg.png"
                  alt="metamask"
                  className="h-6 w-6"
                />
              </span>
            </Button>
          </div>
        </div>
        
        {/* <div className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          <strong>Commentaire client:</strong> 
        </div> */}
        {/* <div className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
          <strong>Code de confirmations :</strong>{' '}
          <span className="bg-blue-100 text-blue-800 text-md font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-blue-900 dark:text-blue-300">
            {commandeInfos.codeConfirmation}
          </span>
        </div> */}
        <hr />
        <h1>
          <strong>Detail de la commande</strong>
        </h1>
        {order?.products && <OrderDetail products={order?.products} />}
      </div>
    );
  };
  if(!order) return <div>Chargement de la commande ...</div>

  return (
    <div className="fixed">
      <Dialog
        open={open ?? false}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        
      >
        <DialogHeader className="justify-between">
          <Typography
            color="blue-gray"
            variant="h5"
            className="w-18 overflow-hidden"
          >
            {truncateText(order?.user?.firstName ?? "", 7)}{" "}
            {truncateText(order?.user?.lastName ?? "", 15)}
          </Typography>
          <IconButton
            color="blue-gray"
            size="sm"
            variant="text"
            onClick={handleOpen}
          >
            <AiOutlineClose className="inline-block w-5 h-5 mr-2" />
          </IconButton>
        </DialogHeader>
        <DialogBody divider className="h-96  overflow-y-scroll">
          {orderBody()?? "Chargement de la commande ..."}
        </DialogBody>
        <DialogFooter>
          {order?.orderStatus ?
            buttonsByStatus(order?.orderStatus) &&
            buttonsByStatus(order?.orderStatus): ""}
        </DialogFooter>
      </Dialog>
    </div>
  );
}
