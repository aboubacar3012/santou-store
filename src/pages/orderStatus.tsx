import React, { useState } from "react";
import { useQRCode } from "next-qrcode";
import QrCodeReader from "@/components/shared/qrCodeReader";
import { Card, CardHeader, CardBody, Typography, CardFooter, Button, IconButton,Avatar,Chip } from "@material-tailwind/react";
import useVerticalScroll from "@/hooks/useVerticalScroll";
import {IoIosArrowBack} from "react-icons/io"
import { AiOutlineAppstore, AiOutlineFieldTime } from "react-icons/ai";
import {GiCash}from "react-icons/gi";
import {MdNumbers} from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import OrderStatusStep from "@/components/order/orderStatusStep";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getOrderByIdService } from "@/services/orders";
import { formatPrice } from "@/utils/formatPrice";
const OrderStatus = () => {
  const router = useRouter();
  const orderId = router.query.orderId as string;
  if(!orderId) router.push("/screens/home-screen")
  const token = useSelector((state: RootState) => state.auth.token);
  const { data, isLoading, isFetching, error, isError } = useQuery({
    queryKey: ["orderId",orderId], // une clé simple car on récupère tous les todos
    queryFn: () => getOrderByIdService(token, orderId), // la fonction qui va retourner les données
    refetchInterval: 1000 * 60 * 1, // rafraîchir les données toutes les minutes
    refetchOnWindowFocus: true, // rafraîchir la requête quand on focus la fenêtre
    refetchOnMount: true, // rafraîchir la requête au montage du composant
    retry: false, // ne pas réessayer la requête en cas d'erreur
    staleTime: 1000 * 60 * 5, // la requête est considérée comme périmée après 5 minutes
  });
  
  const { SVG } = useQRCode();
  const [qrCodeReader, setQrCodeReader] = useState(false)
  const scrollPosition = useVerticalScroll((isScrollingUp) => {
    if (isScrollingUp) {
      // Faire quelque chose lors du scroll vers le haut
      // console.log('Scrolling up');
    } else {
      // Faire quelque chose lors du scroll vers le bas
      // console.log('Scrolling down');
    }
  });
  
  if (isLoading && isFetching) return <h1>Chargement ....</h1>
  if (isError || !data) return router.push("/404");

  // Lorsque on scanne le qrcode si la personne n'a pas paye on lui demande de payer: en affichant un dialog pour montrer les informations de la commande, et button paiement effectue ou annuler
  // Si la personne a paye on lui affiche les informations de la commande et le button deliveré et annuler
  return (
    <div className="overflow-y-scroll">
      <div
        className={`flex items-center justify-between bg-gray-100 p-2 ${
          scrollPosition > 0 && "fixed top-0 left-0 right-0 z-30"
        }`}
      >
        <IconButton
          variant="text"
          color="blue-gray"
          className="bg-blue-100 rounded-2xl"
          onClick={() => {
            router.push("/screens/home-screen")
          }}
        >
          <IoIosArrowBack className="h-5 w-5" />
        </IconButton>
          <h1 className="font-bold">État de la commande</h1>
        <p></p>
        {/* <IconButton
          variant="text"
          color="blue-gray"
          className="bg-blue-100 rounded-2xl"
          onClick={() => {
            handleShow();
          }}
        >
          <IoIosHeartEmpty className="h-5 w-5" />
          <CiShare2
            onClick={() =>
              sharePage(
                "Titre personnalisé",
                "Description personnalisée",
                "http://localhost:3000/afrograille?mode=onsite"
              )
            }
            className="h-5 w-5"
          />
        </IconButton> */}
      </div>
      {/* 
        <button onClick={() => setQrCodeReader(!qrCodeReader)}>
          reader qrCode
        </button>
        {qrCodeReader && (
          <QrCodeReader />
        )}
      */}
      <div className="overflow-y-scroll">
        <div className="flex items-center justify-between p-2">
          <p className="font-semibold text-3xl">{formatPrice(data.order.totalAmount)}</p>
          <Button onClick={() => router.push("/screens/orders-screen")}  color="blue" className="flex items-center gap-2 justify-center py-3">
            <span>{data.order.products.length} Articles</span>
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

        <div className="flex items-center justify-between py-1 px-2 bg-gray-800 text-white">
        <div className="flex flex-col">
          <Typography className="uppercase" variant="h5">{data.order.user.firstName}</Typography>
          <Typography variant="h5">{data.order.user.lastName}</Typography>
        </div>
      <Avatar
        src="https://media.istockphoto.com/id/1337144146/fr/vectoriel/vecteur-dic%C3%B4ne-de-profil-davatar-par-d%C3%A9faut.jpg?s=612x612&w=0&k=20&c=BsQEN372p6cSuFnPGx06xUJ8eMhSjirWMAhodUi74uI="
        alt="avatar"
        // withBorder={true}
        size="xl" 
        className="p-0.5 "
        // color="white"
      />
      </div>
      {/* Numero de commande */}
      <div className="py-2 px-1 flex justify-between items-center">
      <div className="flex justify-start items-center">
        <p className="text-blue-500 text-xl mr-2">
          <MdNumbers className="h-5 w-5" />
        </p>
        <Typography variant="h5">Numéro de commande:</Typography>
        </div>
          
        <Chip color="teal" value={data.order.orderNumber} />

        </div>
        <hr/>

      {/* Mode de recuperation */}
      <div className="py-2 px-1 flex justify-between items-center">
        <div className="flex justify-start items-center">
        <p className="text-blue-500 text-xl mr-2">
          <AiOutlineAppstore className="h-5 w-5" />
        </p>
          <Typography variant="h5">Mode récupération</Typography>
        </div>
        <Chip color="amber" value={data.order.takingOrder === "DELIVERY" ? "LIVRAISON" : "À EMPORTER"} />
      </div>
      <hr/>

      {/* Creneau */}
      <div className="py-2 px-1 flex justify-between items-center">
        <div className="flex justify-start items-center">
        <p className="text-blue-500 text-xl mr-2">
          <AiOutlineFieldTime className="h-5 w-5" />
        </p>
          <Typography variant="h5">Crénau</Typography>
        </div>
        {
          data.order.takingOrder === "DELIVERY" ? 
          <Chip color="blue" value={"DES QUE POSSIBLE"} /> :
          <Chip color="blue" value={`${data.order.timeToPickup.day} ${data.order.timeToPickup.period}`} />
        }
      </div>
      <hr/>

      {/* Paiement */}
      <div className="py-2 px-1 flex justify-between items-center">
      <div className="flex justify-start items-center">
        <p className="text-blue-500 text-xl mr-2">
          <GiCash className="h-5 w-5" />
        </p>
        <Typography variant="h5">Paiement:</Typography>
        </div>
          
          {data.order.paymentStatus === "PAID" ? (
            <Chip size="sm" color="green" value="Déjà payé" />
          ) : (
            <Chip size="sm" color="red" value="Non payé" />
          )}
        </div>
        <hr/>
      {/* Si Mode de Livraison */}
    {
        data.order.takingOrder === "DELIVERY" && (
          <div className="py-2 px-1 flex-col">
        <div className="flex justify-start items-center">
        <p className="text-blue-500 text-xl mr-2">
              <FaLocationDot className="h-5 w-5" />
            </p>
          <Typography variant="h5">Adresse de livraison</Typography>
        </div>
        <p className="px-4">
          {data.order.deliveryAddress.number} {data.order.deliveryAddress.street}, {data.order.deliveryAddress.zipCode} {data.order.deliveryAddress.country} <br/>
          {data.order.deliveryAddress.complement}
        </p>
      </div>
        )
      }
      {/* Si Mode de Mode Pickup */}
      {
         data.order.takingOrder === "PICKUP" && (
          <div className="py-1 px-1 flex-col">
        <div className="flex justify-start items-center">
        <p className="text-blue-500 text-xl mr-2">
              <FaLocationDot className="h-5 w-5" />
            </p>
          <Typography variant="h5">Adresse du restaurant</Typography>
        </div>
        <p className="px-4">
          8 boulevard long champ, 13003 Marseille <br/>
        </p>
      </div>
         )
      }
      
        <hr/>
        <div className="p-2">
          <OrderStatusStep orderStatus={data.order.orderStatus} />
        </div>
        <hr/>
      <div className="mt-5 flex flex-col justify-center items-center">
        <SVG
        text={data.order.id}
        options={{
          margin: 0,
          width: 200,
          color: {
            dark: "#000000",
            light: "#ffffff",
          },
          
        }}
      />
      <p className="font-bold py-5">Presentez ce QR CODE au livreur</p>
      </div>
      </div>
    </div>
  );
};

export default OrderStatus;
