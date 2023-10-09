import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  IconButton,
  Input,
} from "@material-tailwind/react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { GiShoppingCart } from "react-icons/gi";
import { VscTrash } from "react-icons/vsc";
import { AiOutlineEdit } from "react-icons/ai";
import { FiSave } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, addUserId } from "@/redux/features/cartSlice";
import { ProductType } from "@/types/product.type";
import { RootState } from "@/redux/store";
import { Select, Option } from "@material-tailwind/react";

type ProductDetailsProps = {
  handleShow: () => void;
  showProduct: boolean;
  product: ProductType;
  isMerchant: boolean;
};

const ProductDetails = ({
  handleShow,
  showProduct,
  product,
  isMerchant,
}: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState<"S" | "M" | "L" | "XL" | "XXL">("M");
  const [color, setColor] = useState<"RED" | "BLUE" | "GREEN" | "YELLOW" | "BLACK" | "BLANC">("BLACK");
  const [sex, setSex] = useState<"MAN" | "WOMAN" | "UNISEX">("UNISEX");
  const dispatch = useDispatch();
  const [showEdit, setShowEdit] = useState(true);
  const user = useSelector((state: RootState) => state.auth.user);
  const cart = useSelector((state: RootState) => state.cart);


  // use state for product edit
  // const [name, setName] = useState<string | null>(null);
  // const [price, setPrice] = useState<number | null>(null);
  // const [description, setDescription] = useState<string | null>(null);
  // const [category, setCategory] = useState<CategoryType[] | null>(null);
  // const [images, setImages] = useState<string[] | null>(null);

  // useEffect(() => {
  //   if (product) {
  //     setName(product.name);
  //     setPrice(product.price);
  //     setDescription(product.description);
  //     setCategory(product.category);
  //     setImages(product.images);
  //   }
  // }, [product]);

  const handleAddProductToCart = (product: ProductType) => () => {

    const productInCart: any = { ...product, quantity, size, color, sex };
    dispatch(addToCart(productInCart));
    if (!cart.userId) dispatch(addUserId(user?.id as string));
    handleShow();
  };

  if (!product) return <p>Loading</p>;

  const clientFooter = (
    <div className=" flex w-full justify-around items-center ">
      <div className="flex flex-row h-10 w-20  rounded-lg relative bg-transparent ">
        <button
          onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
          className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
        >
          <span className="m-auto text-2xl font-thin">−</span>
        </button>
        <input
          type="number"
          className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
          name="custom-input-number"
          value={quantity}
        />
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
        >
          <span className="m-auto text-2xl font-thin">+</span>
        </button>
      </div>

      <Button
        size="sm"
        className="flex items-center gap-3 ml-1 text-[0.7rem]"
        fullWidth
        onClick={handleAddProductToCart(product)}
      >
        <GiShoppingCart className="h-5 w-5" />
        <span>Ajouter au panier</span>
      </Button>
    </div>
  );

  const merchantFooter = (
    <div className=" flex w-full justify-around items-center ">
      {showEdit ? (
        <Button
          color="green"
          size="sm"
          className="flex items-center gap-3 ml-1"
          fullWidth
          onClick={() => {
            alert("Produit modifié");
            setShowEdit(false);
          }}
        >
          <FiSave className="h-6 w-6" />
          <span>Enregistrer</span>
        </Button>
      ) : (
        <Button
          color="light-blue"
          size="sm"
          className="flex items-center gap-3 ml-1"
          fullWidth
          onClick={() => {
            if (window.confirm("Voulez-vous vraiment modifier ce produit ?")) {
              setShowEdit(true);
            }
          }}
        >
          <AiOutlineEdit className="h-6 w-6" />
          <span>Modifier</span>
        </Button>
      )}

      {!showEdit && (
        <Button
          color="red"
          size="sm"
          className="flex items-center gap-3 ml-1"
          fullWidth
          onClick={() => {
            if (window.confirm("Voulez-vous vraiment supprimer ce produit ?"))
              alert("Produit supprimé");
          }}
        >
          <VscTrash className="h-6 w-6" />
          <span>Supprimer</span>
        </Button>
      )}
    </div>
  );

  return (
    <Dialog
      open={showProduct}
      handler={handleShow}
      animate={{
        mount: { scale: 1, y: 0 },
        unmount: { scale: 0.9, y: -100 },
      }}
      className=""
    >
      <DialogHeader className="text-md justify-between">
        {product.name}
        <IconButton
          color="blue-gray"
          size="sm"
          variant="text"
          onClick={handleShow}
        >
          <AiOutlineCloseCircle className="h-6 w-6" />
        </IconButton>
      </DialogHeader>
      <DialogBody divider>
        <CardHeader shadow={false} floated={false} className="h-56">
          <img
            src={product.images[0]}
            alt="card-image"
            className="h-full w-full object-fill"
          />
        </CardHeader>
        <CardBody>
          <div className=" flex items-center justify-between">
            <Typography color="blue-gray" className="font-medium">
              <strong>Prix:</strong> {product.price/100} €
            </Typography>
          </div>
          {/* <Typography
            variant="small"
            color="blue-gray"
            className="font-normal mb-2"
          >
            {product.category.map((cat) => cat.name + ", ")}
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75 h-[6rem] overflow-y-scroll scroll-b text-justify"
          >
            {product.description}
          </Typography> */}
          {/* Taille */}

          <div className="mt-3">
            <Select
              className="flex items-center"
              label="Choisissez la taille"
              value={size}
              // disabled={
              //   orderStatus === "CANCELLED" || orderStatus === "DELIVERED"
              // }
              onChange={(e) => setSize(e as "S" | "M" | "L" | "XL" | "XXL")}
            >
              <Option
                value="S"
                className="flex justify-start items-center"
              >
                S
              </Option>
              <Option
                value="M"
                className="flex justify-start items-center"
              >
                M
              </Option>
              <Option
                value="L"
                className="flex justify-start items-center"
              >
                L
              </Option>
              <Option
                value="XL"
                className="flex justify-start items-center"
              >
                XL
              </Option>
              <Option
                value="XXL"
                className="flex justify-start items-center"
              >
                XXL
              </Option>
              
            </Select>
          </div>
          {/* Couleur */}
          <div className="mt-3">
            <Select
              className="flex items-center"
              label="Choisissez la couleur"
              value={color}
              // disabled={
              //   orderStatus === "CANCELLED" || orderStatus === "DELIVERED"
              // }
              onChange={(e) => setColor(e as "RED" | "BLUE" | "GREEN" | "YELLOW" | "BLACK" | "BLANC")}
            >
              <Option
                value="RED"
                className="flex justify-start items-center"
              >
                ROUGE
              </Option>
              <Option
                value="BLUE"
                className="flex justify-start items-center"
              >
                BLEU
              </Option>
              <Option
                value="GREEN"
                className="flex justify-start items-center"
              >
                VERT
              </Option>
              <Option
                value="YELLOW"
                className="flex justify-start items-center"
              >
                JAUNE
              </Option>
              <Option
                value="BLACK"
                className="flex justify-start items-center"
              >
                NOIR
              </Option>
              <Option
                value="BLANC"
                className="flex justify-start items-center"
              >
                BLANC
              </Option>
             
              
            </Select>
          </div>
          {/* Sexe */}
          <div className="mt-3">
            <Select
              className="flex items-center"
              label="Choisissez la taille"
              value={sex}
              // disabled={
              //   orderStatus === "CANCELLED" || orderStatus === "DELIVERED"
              // }
              onChange={(e) => setSex(e as "MAN" | "WOMAN" | "UNISEX")}
            >
              <Option
                value="MAN"
                className="flex justify-start items-center"
              >
                HOMME
              </Option>
              <Option
                value="WOMAN"
                className="flex justify-start items-center"
              >
                FEMME
              </Option>
              <Option
                value="UNISEX"
                className="flex justify-start items-center"
              >
                UNISEX
              </Option>
            </Select>
          </div>
        </CardBody>
        <CardFooter className="pt-0">
          {isMerchant ? merchantFooter : clientFooter}
        </CardFooter>
      </DialogBody>
    </Dialog>
  );
};

export default ProductDetails;
