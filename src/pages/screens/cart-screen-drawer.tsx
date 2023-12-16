
import { useEffect, useState } from "react";
import {
  Button,
  Drawer,
  IconButton,
  Carousel,
  Switch,
} from "../../materialTailwind";
import { ProductType } from "@/types/product.type";
import { GoPlus } from "react-icons/go";
import { TbMinus } from "react-icons/tb";
import { IoTrash } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { FaAngleRight, FaArrowRight } from "react-icons/fa"
import { MdError, MdOutlineRemoveShoppingCart } from "react-icons/md";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { updateControl } from "@/redux/features/controlsSlice";
import MissionsMap from "@/components/leaflet/missions-map";
import ClientPosition from "@/components/leaflet/client-position";
import { updateTakingOrder } from "@/redux/features/authSlice";
import { TakingOrderEnum } from "@/types/order.type";
import { useRouter } from "next/router";
import { formatPrice } from "@/utils/formatPrice";
import { truncateText } from "@/utils/truncate-text";
import {
  removeFromCart,
  updateDeliveryCharge,
  updateProductQuantity,
} from "@/redux/features/cartSlice";
import { getOptionsPrice } from "@/utils/getOptionsPrice";
import ContinueShoppingBtn from "@/components/cart/continue-shopping-btn";
import PaiementMethod from "@/components/cart/paiement-method";

type CartScreenDrawerProps = {};

const ErrorMessage = ({message}:{message:string}) => {
  return (
    <div className="flex flex-col justify-center items-center p-4">
      <MdError className="text-3xl text-red-400" bg-red-200 />
      <p className="text-red-400 text-sm">{message}</p>
    </div>
  )
}

const  CartScreenDrawer = () => {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(true);
  const [editCart, setEditCart] = useState(false);
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const cart = useSelector((state: RootState) => state.cart);
  const auth = useSelector((state: RootState) => state.auth);
  const showCart = useSelector(
    (state: RootState) => state.controls.values.showCart
  );
  const takingOrder = useSelector((state: RootState) => state.auth.takingOrder);
  const timeToPickup = useSelector(
    (state: RootState) => state.auth.timeToPickup
  );
  const deliveryCharge = useSelector((state:RootState) => state.cart.deliveryCharge)
  const [paymentMethod, setPaymentMethod] = useState<"wallet" | "credit-card" | "cash">("cash");
  const [paymentStep, setPaymentStep] = useState(1);

  const [showCommentInput, setShowCommentInput] = useState(false);
  const [showPromoCodeInput, setShowPromoCodeInput] = useState(false);

  useEffect(() => {
    console.log("takingOrder", takingOrder)
    if(takingOrder === "DELIVERY") {
      dispatch(updateDeliveryCharge(200));
    }else if (takingOrder === "PICKUP") {
      dispatch(updateDeliveryCharge(0));
    }
  },[takingOrder])

  // ce useEffect permet de bloquer le scroll du body quand le drawer est ouvert
  useEffect(() => {
    if (showCart) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");

    return () => {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showCart]);

  useEffect(() => {
    if(!showCart) {
      setShowCommentInput(false);
    setShowPromoCodeInput(false);
    setEditCart(false);
    }

  }, [showCart]);
  return (
    <Drawer
      overlay={false}
      placement="bottom"
      size={window.innerHeight}
      open={showCart}
      className="py-4 shadow-none fixed overflow-y-auto bg-gray-800 z-50"
    >
      <div className="">
        <div className="flex items-center justify-between  p-2">
          <IconButton
            variant="text"
            color="blue-gray"
            className="bg-white rounded-full "
            onClick={() => {
              dispatch(updateControl({ showCart: false }));
            }}
          >
            <IoMdClose className="h-5 w-5" />
          </IconButton>
          <div
            className="bg-white rounded-2xl text-sm p-2 font-semibold	"
            onClick={() => {
              alert("Nous sommes en train de travailler sur cette fonctionnalité. Bientôt disponible pour répondre à vos besoins ! Restez à l'écoute !")
            }}
          >
            BESOIN D&apos;AIDE ?
          </div>
        </div>
        {/* Mode de recuperation */}
        {/* Livraison */}
        {takingOrder === "DELIVERY" && (
          <div className="bg-white m-2 rounded-2xl">
            <div className="flex justify-between items-center p-2">
              <p className="font-semibold">LIVRAISON</p>
              <Button
                onClick={() =>
                  dispatch(updateControl({ newAddressWindow: true }))
                }
                variant="gradient"
                size="sm"
                color="blue"
              >
                Modifier
              </Button>
            </div>
            {/* A modifier biensure */}
            {/* <ClientPosition /> */}
            {
              auth && !auth.isAuthenticated && (
                <ErrorMessage message="Connectez vous pour afficher votre adresse" />
              )
            }
            {
              auth && auth.user && auth.user.addresses && auth.user.addresses.length > 0 && (
                <div className="flex flex-col p-2">
              <h2 className="font-medium text-gray-400">
                LIVRAISON À L&apos;ADRESSE
              </h2>
              <p className="font-bold">Maison</p>
              <p>{auth.user.addresses[0].number}, {auth.user.addresses[0].street}</p>
              <p>{auth.user.addresses[0].zipCode} {auth.user.addresses[0].country}</p>
              <br />
              <h2 className="font-medium text-gray-400">
                INDICATIONS POUR LE LIVREUR
              </h2>
              <p>{auth.user.addresses[0].complement}</p>
            </div>
              )
            }
            {
              !auth || !auth.user || !auth.user.addresses || !auth.user.addresses.length && (
                <div className="flex flex-col p-2">
                  <p className="font-semibold">Aucune adresse </p>
                </div>
              )
            }
            
            <div
              onClick={() =>
                dispatch(updateTakingOrder(TakingOrderEnum.PICKUP))
              }
              className="flex w-full justify-end text-white items-center p-4 bg-blue-400 rounded-b-2xl"
            >
              <p>Passer à emporter</p>
            </div>
          </div>
        )}

        {/* A Emporter */}
        {takingOrder === "PICKUP" && (
          <div className="bg-white m-2 rounded-2xl">
            <div className="flex justify-between items-center p-2">
              <p className="font-semibold">A EMPORTER</p>
            </div>
            <div className="flex flex-col p-2">
              <h2 className="font-medium text-gray-400">RÉCUPÉRATION</h2>
              <p className="font-bold">AfroGraille</p>
              <p>23 Rue Mathieu Stilatti</p>
              <p>13003 Marseille</p>
            </div>
            <div
              onClick={() =>
                dispatch(updateTakingOrder(TakingOrderEnum.DELIVERY))
              }
              className="flex w-full justify-end text-white items-center p-4 bg-blue-400 rounded-b-2xl"
            >
              <p>Passer en livraison</p>
            </div>
          </div>
        )}

        <br />
        {/* Crénau */}
        <div className="bg-white m-2 rounded-2xl">
          <div className="flex justify-between items-center p-2">
            <p className="font-semibold">CRÉNEAU</p>
            <Button
              onClick={() =>
                dispatch(updateControl({ planningOrderDrawer: true }))
              }
              variant="gradient"
              size="sm"
              color="blue"
            >
              Planifier
            </Button>
          </div>
          <div
            onClick={() =>
              dispatch(updateControl({ planningOrderDrawer: true }))
            }
            className="p-3"
          >
            {/* 
              si le mode de recuperation est delivery
            */}
            {timeToPickup && timeToPickup.now && (
              <p className="bg-gray-400 p-3 rounded-2xl">
                Dès que possible (~ 15 - 23 min)
              </p>
            )}
            {/* 
              si le mode de recuperation est pickup
            */}
            {timeToPickup && !timeToPickup.now && (
              <p className="bg-gray-400 p-3 rounded-2xl">
                Précommande pour: {timeToPickup?.day} {timeToPickup?.period}
              </p>
            )}
          </div>
        </div>
        <br />
        {/* Contenu Panier */}
        <div className="bg-white m-2 rounded-2xl mb-20">
          <div className="flex justify-between items-center p-2">
            <p className="font-semibold">PANIER</p>
            <Button
              onClick={() => {
                if (cart && cart.products && cart.products.length > 0) {
                  if (editCart) {
                    setEditCart(false);
                  } else {
                    setEditCart(true);
                  }
                } else {
                  dispatch(updateControl({ showCart: false }));
                  router.push("/screens/home-screen");
                }
              }}
              variant="gradient"
              size="sm"
              color={editCart ? "green" : "blue"}
            >
              {editCart ? "Enregistrer" : "Modifier"}
            </Button>
          </div>
          {/* Articles */}
          {cart && cart.products && cart.products.length > 0 && (
            <div>
              {/* <hr />
            <div className="flex justify-between items-center p-2">
              <div className="flex justify-start items-center">
                <p className=" flex justify-center items-center rounded-full py-1 px-3 bg-blue-400 m-2">
                  <span>1</span>
                </p>
                <div>
                  <p className="font-semibold">Le Gratiné Au Fromage</p>
                  <p className="font-medium">
                    Viande au choix: <span className="font-light">Poulet</span>
                  </p>
                  <p className="font-medium">
                    Sauces: <span className="font-light">Algerienne</span>
                  </p>
                  <p className="font-medium">
                    Boisson: <span className="font-light">Bissap 1L</span>
                  </p>
                </div>
              </div>
              <p className="font-semibold">9,90 €</p>
            </div> */}
              {cart && cart.products && cart.products.map((product: ProductType) => (
                <div key={product.id}>
                  <hr />
                  <div className="flex justify-between items-center p-2">
                    <div className="flex items-center">
                      <img
                        className="w-20 h-20 rounded-2xl"
                        src={product.images[0]}
                        alt="product"
                      />
                      <div className="flex flex-col ml-2">
                        <p className="font-semibold">
                          {editCart
                            ? truncateText(product.name, 11)
                            : truncateText(product.name, 18)}
                        </p>
                        <p className="text-gray-600 font-semibold">
                          {formatPrice(product.price + getOptionsPrice(product?.options)) }{" "}
                        </p>
                        {/* <p className="text-gray-400">{product.description}</p> */}
                        {
                          product.options && product.options.length > 0 && (
                            <div className="flex flex-col">
                              {
                                product.options.map((option:any) => (
                                  <div key={option.id} className="flex justify-start items-center">
                                    <p className="text-gray-400">{option.name}: </p>
                                    {
                                      option.min === 0 && option.max > 1 && (<p className="text-gray-400 mx-1">{option.values.length}</p>)
                                    }
                                    {
                                      option.min === 1 && option.max === 1 && (<p className="text-gray-400 mx-1">{option.values[0].name}</p>)
                                    }
                                    
                                    
                                  </div>
                                ))
                              }
                            </div>
                          )
                        }
                        
                      </div>
                    </div>
                    <div className="flex items-center">
                      {/* <p className="font-semibold">x{product.quantity}</p> */}
                      <div className="flex items-center justify-center">
                        {editCart && (
                          <button
                            onClick={() =>
                              dispatch(
                                updateProductQuantity({
                                  product,
                                  quantity: product.quantity
                                    ? product.quantity - 1
                                    : 1,
                                })
                              )
                            }
                            className="bg-gray-200 rounded-full h-8 w-8 flex items-center justify-center"
                          >
                            <TbMinus className="h-5 w-5" />
                          </button>
                        )}
                        <p className="text-m font-semibold text-gray-700 dark:text-gray-200 mx-2">
                          {editCart ? "" : "x"}
                          {product.quantity}
                        </p>
                        {editCart && (
                          <button
                            onClick={() =>
                              dispatch(
                                updateProductQuantity({
                                  product,
                                  quantity: product.quantity
                                    ? product.quantity + 1
                                    : 1,
                                })
                              )
                            }
                            className="bg-gray-200 rounded-full h-8 w-8 flex items-center justify-center"
                          >
                            <GoPlus className="h-5 w-5" />
                          </button>
                        )}
                      </div>
                      {editCart && (
                        <IconButton
                          variant="text"
                          color="red"
                          className="bg-white rounded-full "
                          onClick={() => {
                            if (
                              window.confirm(
                                "Êtes-vous sûr de vouloir supprimer cet article?"
                              )
                            ) {
                              setEditCart(false);
                              dispatch(removeFromCart(product));
                            }
                          }}
                        >
                          <IoTrash className="h-6 w-6" />
                        </IconButton>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Couverts */}
              {/* <hr />
              <div className="flex justify-between px-4 py-4">
                <p>Couverts</p>
                <Switch crossOrigin={undefined} color="blue" defaultChecked />
              </div> */}
              <hr />
              <div className="flex flex-col p-4">
                <div className="flex justify-between items-center ">
                  <p>Sous-total</p>
                  <p className="font-semibold">{formatPrice(cart.amount)}</p>
                </div>
                {
                  takingOrder === "DELIVERY" && (
                    <div className="flex justify-between items-center">
                  <p>Frais de livraison </p>
                  <p className="font-semibold">{deliveryCharge} €</p>
                </div>
                  )
                }
                <div className="flex justify-between items-center ">
                  <p className="font-semibold">Total à payer</p>
                  <p className="font-semibold text-green-500">
                    {formatPrice(cart.totalAmount)}
                  </p>
                </div>
              </div>
              {/* Afficher le commentaire */}
              {showCommentInput && (
                <div>
                  <hr />
                  <div className="p-4">
                    <p className="text-gray-400 font-medium">
                      COMMENTAIRE SUR LA COMMANDE
                    </p>
                    <textarea
                      style={{ resize: "none" }}
                      className="w-full h-24 p-4 bg-gray-200"
                      placeholder="Ex: Commentaire sur la préparation ou allergies"
                    ></textarea>
                  </div>
                </div>
              )}
              {/* Entrez votre code promo */}
              {showPromoCodeInput && (
                <div>
                  <hr />
                  <div className="flex justify-between items-center p-1">
                    <input
                      className="w-full h-10 p-2 bg-gray-200 rounded-2xl mx-2"
                      placeholder="Entrez votre code promo"
                    />
                    <Button variant="gradient" size="md" color="blue">
                      Valider
                    </Button>
                  </div>
                </div>
              )}

              {/* <div className="flex w-full justify-between text-white items-center p-4 bg-blue-400 rounded-b-2xl">
                {!showCommentInput && (
                  <p onClick={() => setShowCommentInput(true)}>
                    Ajouter un commentaire
                  </p>
                )}
                {showCommentInput && (
                  <p
                    className="text-red-500"
                    onClick={() => setShowCommentInput(false)}
                  >
                    Supprimer le commentaire
                  </p>
                )}
                {!showPromoCodeInput && (
                  <p onClick={() => setShowPromoCodeInput(true)}>Code promo</p>
                )}
              </div> */}
            </div>
          )}
          {/* Panier vide */}
          {(!cart || !cart.products || cart.products.length === 0) && (
            <div className="flex flex-col justify-center items-center p-4">
              <MdOutlineRemoveShoppingCart className="text-6xl text-gray-400" />
              <p className="text-gray-400">Votre panier est vide</p>
              <ContinueShoppingBtn />
            </div>
          )}
        </div>
        {
          cart && cart.products.length > 0 && (
            <div className="fixed text-black bottom-0 left-0 right-0 flex w-full justify-between items-center p-4 bg-blue-400 shadow-lg  rounded-t-2xl">
          <div>
          <p className="text-lg">TOTAL</p>
            <p className="text-2xl font-sm">{formatPrice(cart.totalAmount)}</p>
          </div>

          <div onClick={() =>  dispatch(updateControl({ showPaymentDrawer:true }))} className="flex items-center">
            <p className="text-lg">VALIDER</p>
            <FaAngleRight className="w-6 h-6" />
          </div>
        </div>
          )
        }
      </div>
    </Drawer>
  );
}

export default CartScreenDrawer;