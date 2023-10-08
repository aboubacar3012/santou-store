import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import NavbarComponent from "../components/shared/navbar";
import { CartType } from "@/types/cart.type";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { OrderStatusEnum, PaymentStatusEnum } from "@/types/order.type";
import { createOrderService, updateOrderByIdService } from "@/services/orders";
import { clearCart } from "@/redux/features/cartSlice";

const PaymentValidationScreen = () => {
  const router = useRouter();
  const [paied, setPaied] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>("");
  const [pageStatus, setPageStatus] = useState<"loading" | "paied" | "unpaied">(
    "loading"
  );
  const cart = useSelector((state: RootState) => state.cart);
  const user = useSelector((state: RootState) => state.auth.user);
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.auth.token);

  const checkPaymentStatus = async (payementInt: any) => {
    setPageStatus("loading");
    try {
      const response = await fetch(
        `https://api.stripe.com/v1/payment_intents/${payementInt}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`, // Remplacez par votre clé secrète Stripe
          },
        }
      );

      const paymentIntent = await response.json();

      if (paymentIntent.status === "succeeded") {
        setMessage("Le paiement a réussi.");
        setPageStatus("paied");
        handleUpdateOrderStatus(token);
      } else {
        setMessage("Le paiement a échoué.");
        setPageStatus("unpaied");
      }
    } catch (error) {
      setMessage(
        "Une erreur est survenue lors de la récupération du statut du paiement."
      );
      setPageStatus("unpaied");
    }
  };

  const handleUpdateOrderStatus = async (token: string | null) => {
    const orderId = localStorage.getItem("orderId");
    if (orderId) {
      const response = await updateOrderByIdService(
        orderId,
        {
          paymentStatus: PaymentStatusEnum.PAID,
        },
        token
      );
      if (response.success) {
        dispatch(clearCart());
        localStorage.removeItem("orderId");
      }
    }
  };

  useEffect(() => {
    if (router.isReady) {
      const payementInt = router.query.payment_intent;
      const payementIntClientSecret = router.query.payment_intent_client_secret;
      const redirectStatus = router.query.redirect_status;
      checkPaymentStatus(payementInt).then(() => null);
    }
  }, [router, paied]);

  // Automatically redirect to the payment page in 10 seconds
  useEffect(() => {
    if (pageStatus === "loading") {
      setTimeout(() => {
        router.push("/screens/home-screen");
      }, 10000);
    }
  }, []);

  const containerStyle =
    "fixed w-full  overflow-y-scroll rounded-1xl  z-10";

  return (
    <div className={`${containerStyle}`}>
     
      {pageStatus === "loading" && <div>Loading...</div>}
      {pageStatus === "paied" && (
        <div className="bg-white  mt-12 rounded-3xl border">
          <div className="bg-gray-100 rounded-3xl p-6 ">
            <svg
              viewBox="0 0 24 24"
              className="text-green-600 w-16 h-16 mx-auto my-6"
            >
              <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              ></path>
            </svg>
            <div className="text-center">
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                {message}
              </h3>
              <p className="text-gray-600 my-2">
                Merci d&apos;avoir effectué votre paiement en ligne sécurisé.
              </p>
              <p> Nous avons hâte de vous retrouver très bientôt !</p>
              <div className="py-10 text-center">
                <Link
                  href="/screens/home-screen"
                  className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                >
                  Retourné à l&apos;accueil
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {pageStatus === "unpaied" && (
        <div className="bg-white  mt-12 mx-2 rounded-3xl border">
          <div className="bg-gray-100 rounded-3xl p-6  md:mx-auto">
            <svg
              viewBox="0 0 24 24"
              className="text-red-600 w-16 h-16 mx-auto my-6"
            >
              <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              ></path>
            </svg>
            <div className="text-center">
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                {message}
              </h3>
              <p className="text-gray-600 my-2">
                Nous regrettons de vous informer que votre paiement en ligne
                n&apos;a pas été effectué avec succès. Veuillez vérifier les
                détails de votre paiement et réessayer. Si vous rencontrez
                toujours des difficultés, n&apos;hésitez pas à nous contacter
                pour obtenir de l&apos;aide. Nous sommes là pour vous
                accompagner.
              </p>
              <p> Merci pour votre compréhension.</p>
              <div className="py-10 text-center">
                <Link
                  href="/screens/home-screen"
                  className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                >
                  Retourné à l&apos;accueil
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentValidationScreen;
