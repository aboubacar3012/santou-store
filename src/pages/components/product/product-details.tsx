import React, { useState } from "react";
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
const ProductDetails = ({ handleShow, showProduct, product }: any) => {
  const [quantity, setQuantity] = useState(1);

  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(target.value));
  };

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
        {product?.name}
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
            src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=927&q=80"
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="font-medium">
              Apple AirPods
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              $95.00
            </Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75"
          >
            With plenty of talk and listen time, voice-activated Siri access,
            and an available wireless charging case.
          </Typography>
        </CardBody>
        <CardFooter className="pt-0">
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
            >
              <GiShoppingCart className="h-6 w-6" />
              <span>Ajouter</span>
            </Button>
          </div>
        </CardFooter>
      </DialogBody>
    </Dialog>
  );
};

export default ProductDetails;
