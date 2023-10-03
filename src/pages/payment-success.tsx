import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const PaiementSucess = () => {
  const router = useRouter();
  const [paied, setPaied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>("");
  const checkPaymentStatus = async (payementInt: any) => {
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
        setPaied(true);
      } else {
        setMessage("Le paiement a échoué.");
        setPaied(false);
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération du statut du paiement:",
        error
      );
      setMessage(
        "Une erreur est survenue lors de la récupération du statut du paiement."
      );
      setPaied(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    if (router.isReady) {
      const payementInt = router.query.payment_intent;
      const payementIntClientSecret = router.query.payment_intent_client_secret;
      const redirectStatus = router.query.redirect_status;

      console.log({ payementInt, payementIntClientSecret, redirectStatus });
      checkPaymentStatus(payementInt).then(() => null);
    }
    setIsLoading(false);
  }, [router, paied]);

  if (isLoading) return <div>Loading...</div>;

  if (paied)
    return (
      <div>
        <div className="bg-gray-100 h-screen">
          <div className="bg-white p-6  md:mx-auto">
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
                Thank you for completing your secure online payment.
              </p>
              <p> Have a great day!</p>
              <div className="py-10 text-center">
                <Link
                  href="/"
                  className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                >
                  GO BACK
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

  if (!paied)
    return (
      <div>
        <div className="bg-gray-100 h-screen">
          <div className="bg-white p-6  md:mx-auto">
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
                Thank you for completing your secure online payment.
              </p>
              <p> Have a great day!</p>
              <div className="py-10 text-center">
                <Link
                  href="/"
                  className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                >
                  GO BACK
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default PaiementSucess;
