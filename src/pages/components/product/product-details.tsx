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
    const productInCart: ProductType = { ...product, quantity };
    dispatch(addToCart(productInCart));
    if (!cart.userId) dispatch(addUserId(user?.id as string));
    handleShow();
  };

  if (!product) return <p>Loading</p>;

  const clientFooter = (
    <div className=" flex w-full justify-around items-center ">
      <div className="flex flex-row h-10 w-28  rounded-lg relative bg-transparent ">
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
        className="flex items-center gap-3 ml-1"
        fullWidth
        onClick={handleAddProductToCart(product)}
      >
        <GiShoppingCart className="h-6 w-6" />
        <span>Ajouter</span>
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
      <DialogHeader className="justify-between">
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
        <CardHeader shadow={false} floated={false} className="h-60">
          <img
            src={product.images[0]}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <div className=" flex items-center justify-between">
            <Typography color="blue-gray" className="font-medium">
              {product.name}
            </Typography>

            <Typography color="blue-gray" className="font-medium">
              {product.price} €
            </Typography>
          </div>
          <Typography
            variant="small"
            color="blue-gray"
            className="font-normal mb-2"
          >
            {product.category.map((cat) => cat.name + ", ")}
          </Typography>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75"
          >
            {product.description}
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
          {isMerchant ? merchantFooter : clientFooter}
        </CardFooter>
      </DialogBody>
    </Dialog>
  );
};

export default ProductDetails;
