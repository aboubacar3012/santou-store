import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const PaiementCashCompleteScreen = () => {
  const router = useRouter();
  const orderId = localStorage.getItem("orderId");

  useEffect(() => {
    setTimeout(() => {
      return router.push(`/orderStatus?orderId=${orderId}`);
    }, 10000);
}, [orderId, router]);

  return (
    <div className="bg-white  mt-8 rounded-3xl p-2">
          <div className="bg-gray-100 rounded-3xl p-6 ">
            <svg
              viewBox="0 0 24 24"
              className="text-green-600 w-16 h-16 mx-auto my-4"
            >
              <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              ></path>
            </svg>
            <div className="text-center">
              <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
                Commande validée
              </h3>
              <p className="text-gray-600 my-2">
                Merci d&apos;avoir validé votre commande, le paiement en espèce sera effectué à la livraison.
              </p>
              <p> Nous avons hâte de vous retrouver très bientôt !</p>
              <div className="py-10 text-center">
                <Link
                  href={`/orderStatus?orderId=${orderId}`}
                  className="px-12 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3"
                >
                  Suivre ma commande
                </Link>
              </div>
            </div>
          </div>
        </div>
  )
}

export default PaiementCashCompleteScreen