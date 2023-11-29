import React, { useEffect, useState } from "react";
import {
  Button,
  Drawer,
  IconButton,
  Carousel,
  Radio,
} from "../../materialTailwind";
import { ProductType } from "@/types/product.type";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { TbMinus } from "react-icons/tb";
import Image from "next/image";
import { formatPrice } from "@/utils/formatPrice";
import { addToCart, addUserId } from "@/redux/features/cartSlice";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { OptionType } from "@/types/option.type";
import { OptionValueType } from "@/types/optionValue.type";
import { Checkbox } from "@material-tailwind/react";
import { getOptionsPrice } from "@/utils/getOptionsPrice";
import { truncate } from "fs";
import { truncateText } from "@/utils/truncate-text";

type ProductDetailsDrawerProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  product: ProductType;
  isMerchant: boolean;
  handleShow: () => void;
};

export function ProductDetailsDrawer({
  open,
  setOpen,
  product,
  handleShow,
}: ProductDetailsDrawerProps) {
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(true);
  const user = useSelector((state: RootState) => state.auth.user);
  const cart = useSelector((state: RootState) => state.cart);
  const [selectedOptions, setSelectedOptions] = useState<OptionType[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    setIsExpanded(false);
    console.log(product, "product details");
    // Recuperer toutes options et mettre dans selectedOptions sans rajouter les valeurs des options, qui seront rajoutes plus tard
    if (product) {
      const options: OptionType[] = [];
      product.options.forEach((option: OptionType) => {
        const optionTemp = { ...option };
        optionTemp.values = [];
        options.push(optionTemp);
      });
      setSelectedOptions(options);
    }

    return () => {
      setSelectedOptions([]);
    };
  }, [cart, product]);

  // ce useEffect permet de bloquer le scroll du body quand le drawer est ouvert
  useEffect(() => {
    if (open) document.body.classList.add("overflow-hidden");
    else document.body.classList.remove("overflow-hidden");
  }, [open]);

  const handleCheckboxChange = (
    e: any,
    option: OptionType,
    value: OptionValueType
  ) => {
    const isChecked = e.target.checked;
    setSelectedOptions((prevOptions) => {
      const updatedOptions = [...prevOptions];
      const currentOptionIndex = updatedOptions.findIndex(
        (o) => o.id === option.id
      );

      if (isChecked) {
        if (currentOptionIndex !== -1) {
          updatedOptions[currentOptionIndex] = {
            ...updatedOptions[currentOptionIndex],
            values: [...updatedOptions[currentOptionIndex].values, value],
          };
        } else {
          updatedOptions.push({ ...option, values: [value] });
        }
      } else {
        if (currentOptionIndex !== -1) {
          updatedOptions[currentOptionIndex] = {
            ...updatedOptions[currentOptionIndex],
            values: updatedOptions[currentOptionIndex].values.filter(
              (optionValue) => optionValue.id !== value.id
            ),
          };
        }
      }
      return updatedOptions;
    });
  };

  const handleRadioChange = (option: OptionType, value: OptionValueType) => {
    setSelectedOptions((prevOptions) => {
      const updatedOptions = prevOptions.map((o) => {
        if (o.id === option.id) {
          return {
            ...o,
            values: [value], // Remplace les valeurs existantes par la nouvelle valeur pour le bouton radio
          };
        }
        return o;
      });
      return updatedOptions;
    });
  };

  const handleAddProductToCart = (product: ProductType) => () => {
    // verifier si il ya une option obligatoire qui n'a pas ete selectionnee
    const requiredOption = selectedOptions.find((option) => option.min === 1);
    if (requiredOption && requiredOption.values.length === 0) {
      return alert("Vous devez choisir une option obligatoire");
    }

    const productInCart: any = {
      ...product,
      quantity,
      options: selectedOptions,
    };
    dispatch(addToCart(productInCart));
    if (!cart.userId) dispatch(addUserId(user?.id as string));
    handleShow();
  };

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  if (!product) return <p>Loading</p>;

  console.log(selectedOptions, "selectedOptions");

  return (
    <Drawer
      overlay={false}
      placement="right"
      size={window.innerWidth}
      open={open}
      onClose={handleShow}
      className="pb-4 shadow-none fixed overflow-y-auto"
    >
      <div className="mb-20">
        <div className="flex items-center justify-between bg-gray-100 p-2">
          <IconButton
            variant="text"
            color="blue-gray"
            className="bg-blue-100 rounded-2xl"
            onClick={() => {
              handleShow();
            }}
          >
            <IoIosArrowBack className="h-5 w-5" />
          </IconButton>
          <IconButton
            variant="text"
            color="blue-gray"
            className="bg-blue-100 rounded-2xl"
            onClick={() => {
              // handleShow();
            }}
          >
            <IoIosHeartEmpty className="h-5 w-5" />
          </IconButton>
        </div>
        <div className="flex items-center justify-center">
          {/* {product.images.length === 1 && ( */}
          <Image
            src={product.images[0]}
            width={window.innerWidth}
            height={window.innerHeight - window.innerHeight / 3}
            alt={product.name}
            className="w-full h-80"
          />
          {/* )} */}
          {/* {product.images.length > 1 && (
            <Carousel className="rounded-xl">
              {product.images.map((image, index) => (
                <Image key={index} src={product.images[index]} width={window.innerWidth} height={200} alt={product.name} />
              ))}
            </Carousel>
          )} */}
        </div>
        <div className="px-2">
          <div className="flex justify-between items-center mt-4 text-2xl">
            <h1 className=" font-semibold text-gray-700 dark:text-gray-200 ">
              {product.name}
            </h1>
            <p>{formatPrice(product.price)}</p>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {product.description.length > 15 &&
              truncateText(
                product.description,
                isExpanded ? product.description.length : 100
              )}
            <button
              className="font-bold text-gray-700"
              onClick={toggleDescription}
            >
              {product.description.length > 100
                ? isExpanded
                  ? "Voir moins"
                  : "Voir plus"
                : ""}
            </button>
          </p>

          {/* Options */}

          {product.options &&
            product.options.map((option: OptionType, index: number) => (
              <div key={option.name} className="border p-2 rounded-lg my-2">
                <h2 className="font-semibold">
                  {option.name}{" "}
                  {option.min === 1 && (
                    <span className="text-red-200">(Obligatoire*)</span>
                  )}
                </h2>
                {option.min === 0 && (
                  <p className="font-light">
                    Optionnel, choissez en {option.values.length} maximum
                  </p>
                )}

                <div className="flex flex-col">
                  {option &&
                    option.values &&
                    option.values.map(
                      (value: OptionValueType, index: number) => (
                        <div key={value.name}>
                          <hr />
                          <div className="flex justify-between items-center">
                            {option.min === 1 && option.max === 1 && (
                              <Radio
                                // containerProps = {{style: {paddingLef:0}}   }
                                crossOrigin={undefined}
                                name="type"
                                label={value.name}
                                icon={
                                  <IoCheckmark className="text-green-500 p-0" />
                                }
                                checked={
                                  selectedOptions
                                    .find((o) => o.id === option.id)
                                    ?.values.find((v) => v.id === value.id)
                                    ? true
                                    : false
                                }
                                onClick={() => handleRadioChange(option, value)}
                                // onChange={(e) => handleCheckboxChange(e, option, value)}
                              />
                            )}

                            {option.min === 0 && option.max > 1 && (
                              <Checkbox
                                // containerProps = {{style: {paddingLef:0}}   }
                                crossOrigin={undefined}
                                name="type"
                                label={value.name}
                                icon={
                                  <IoCheckmark className="text-green-500 p-0" />
                                }
                                checked={
                                  selectedOptions
                                    .find((o) => o.id === option.id)
                                    ?.values.find((v) => v.id === value.id)
                                    ? true
                                    : false
                                }
                                // onClick={() => dispatch(updateTakingOrder(TakingOrderEnum.DELIVERY))}
                                onChange={(e) =>
                                  handleCheckboxChange(e, option, value)
                                }
                              />
                            )}

                            <p className="pr-8">
                              {value.price > 0
                                ? `+${formatPrice(value.price)}`
                                : ""}
                            </p>
                          </div>
                        </div>
                      )
                    )}
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 flex w-full justify-between p-4 bg-white shadow-lg bg-gradient-to-r from-blue-100 to-blue-200 rounded-t-lg">
        <div className="flex items-center justify-center">
          <button
            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
            className="bg-gray-200 rounded-full h-8 w-8 flex items-center justify-center"
          >
            <TbMinus className="h-6 w-6" />
          </button>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 mx-2">
            {quantity}
          </p>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="bg-gray-200 rounded-full h-8 w-8 flex items-center justify-center"
          >
            <GoPlus className="h-6 w-6" />
          </button>
        </div>

        <Button
          onClick={handleAddProductToCart(product)}
          color="blue"
          className="flex gap-x-10"
        >
          <p>Ajouter</p>
          <p>
            {formatPrice(
              (product.price + getOptionsPrice(selectedOptions)) * quantity
            )}
          </p>
        </Button>
      </div>

      {/* <div>
        <h2>Boissons au choix*</h2>
        <p>
          * Obligatoires, choisissez au maximum 1 boisson parmi les 3 proposées
        </p>
        <div className="flex flex-col">
          <Radio
            crossOrigin={false}
            name="type"
            label="Livraison"
            // icon={<IoCheckmark className="text-green-500" />}
            // checked={selected === "DELIVERY"}
            // onClick={() => dispatch(updateTakingOrder(TakingOrderEnum.DELIVERY))}
            // onChange={(e) => console.log(e)}
          />
          <Radio
            crossOrigin={false}
            name="type"
            label="À emporter"
            // icon={<IoCheckmark className="text-green-500" />}
            // checked={selected === "PICKUP"}
            // onClick={() => dispatch(updateTakingOrder(TakingOrderEnum.PICKUP))}
            // onChange={(e) => console.log(e)}
          />
        </div>
      </div> */}
      {/* Option Supplements */}
      {/* <div>
        <h2>Barquette</h2>
        <p>
          Choississez au maximum 1 barquette parmi les 3 proposées.
        </p>
        <div className="flex flex-col">
          <Radio
            crossOrigin={false}
            name="type"
            label="Livraison"
            // icon={<IoCheckmark className="text-green-500" />}
            // checked={selected === "DELIVERY"}
            // onClick={() => dispatch(updateTakingOrder(TakingOrderEnum.DELIVERY))}
            // onChange={(e) => console.log(e)}
          />
          <Radio
            crossOrigin={false}
            name="type"
            label="À emporter"
            // icon={<IoCheckmark className="text-green-500" />}
            // checked={selected === "PICKUP"}
            // onClick={() => dispatch(updateTakingOrder(TakingOrderEnum.PICKUP))}
            // onChange={(e) => console.log(e)}
          />
        </div>
      </div> */}
    </Drawer>
  );
}
