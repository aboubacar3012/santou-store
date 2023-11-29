import React, { use, useEffect, useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "../../materialTailwind";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { clearControls, updateControl } from "@/redux/features/controlsSlice";
import PaiementMethod from "../cart/paiement-method";
import { CartType } from "@/types/cart.type";
import { isAuthenticated } from "@/redux/features/authSlice";
import { useRouter } from "next/router";
import { clearCart } from "@/redux/features/cartSlice";
import { validateCart } from "@/services/cart";
import Payement from "./payment";
import { GrSecure } from "react-icons/gr";
import { FaCcStripe } from "react-icons/fa";

 
const PaymentDrawer = () => {
  const router = useRouter();
  const cart = useSelector((state: RootState) => state.cart);
  const auth = useSelector((state: RootState) => state.auth);
  const user = auth.user;
  const isAuth = auth.isAuthenticated;
  const token = useSelector((state: RootState) => state.auth?.token);
  const selectedAddress = user?.addresses[0]; // A corriger
  const takingOrder = auth.takingOrder;
  const timeToPickup = auth.timeToPickup;

  const handleShowConfirm = () => {
    const confirm = window.confirm("Vous devez vous connecter pour valider votre commande");
      if (confirm) {
        dispatch(clearControls())
        dispatch(isAuthenticated(false))
        return router.push("/auth/login");
      }
  }



  const paymentDrawer = useSelector((state: RootState) => state.controls.values.showPaymentDrawer);
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState<"wallet" | "credit-card" | "cash">("cash");
  const [paymentStep, setPaymentStep] = useState(1);
  const [validateCartMyCart, setValidateCartMyCart] = useState(false);

  useEffect(() => {
    setPaymentStep(1);
    setPaymentMethod("credit-card");

  }, [])
  const closeDrawer = () => {
    dispatch(updateControl({ showPaymentDrawer:false }));
    setPaymentStep(1)
  };

  const handleValidateCart = async (cart: CartType, token: string | null) => {
    setValidateCartMyCart(false);
    if(!cart.userId || !isAuth) return handleShowConfirm()
    const finalCart = {
      ...cart,
     takingOrder,
      timeToPickup,
    };
    const response = await validateCart(finalCart, token);
    if (response.success) {
      if(paymentMethod === "cash"){
        dispatch(updateControl({ showPaymentDrawer: false }))
        router.push("/screens/paiement-cash-complete-screen");
        dispatch(clearCart());
      }
      else if(paymentMethod === "credit-card"){
        setPaymentStep(2);
      localStorage.setItem("orderId", response.data.id);
      
      return;
      }
    } else if (response.error && response.status === 401){
     return handleShowConfirm();
    }else 
      {
        alert("Une erreur s'est produite, veillez réprendre votre commande")
        dispatch(clearCart());
        return router.push("/screens/home-screen");
      }
  };

  useEffect(() => {
    if(validateCartMyCart) handleValidateCart(cart, token);
    
  }, [validateCartMyCart])

  // const getContent = () => {
  //   if(paymentStep === 1)
  //     return     <PaiementMethod method={paymentMethod} setMethod={setPaymentMethod}  setPaymentStep={setPaymentStep}/>
  //   else if(paymentStep ===2) handleValidateCart(cart, token);
    
  // }



  return (
    <React.Fragment>
      <Drawer overlay={false} size={window.innerHeight} open={paymentDrawer} className="p-4" placement="bottom">
      <div className="flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            PAIEMENT 
          </Typography>
          <IconButton
            variant="text"
            color="blue-gray"
            onClick={closeDrawer}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        <hr />
        {
          paymentStep === 1 && (
            <PaiementMethod method={paymentMethod} setMethod={setPaymentMethod}  setPaymentStep={setPaymentStep} setValidateCart={setValidateCartMyCart}/>
          )
        }
        {paymentStep === 2 && (<Payement cart={cart} />)}
      </Drawer>
    </React.Fragment>
 
  );
}

export default PaymentDrawer;