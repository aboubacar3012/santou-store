import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { updateControl } from "@/redux/features/controlsSlice";
import { RootState } from "@/redux/store";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useRouter } from "next/router";
import { BsArrowLeftCircle } from "react-icons/bs";
import { truncateText } from "../../../utils/truncate-text";
import { useState } from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
  Radio,
} from "@material-tailwind/react";
import { IoCheckmark } from "react-icons/io5";
import { updateTakingOrder } from "@/redux/features/authSlice";
import Overlay from "../overlay";
import { TakingOrderEnum } from "@/types/order.type";

const TakingOrderDrawer = () => {
  const [selected, setSelected] = useState<TakingOrderEnum | null>(null);
  const dispatch = useDispatch();
  const takingOrderDrawer = useSelector(
    (state: RootState) => state.controls.values.takingOrderDrawer
  );
  const orderChoiceDrawer = useSelector(
    (state: RootState) => state.controls.values.orderChoiceDrawer
  );
  const takingOrder = useSelector((state: RootState) => state.auth.takingOrder);

  useEffect(() => {
    setSelected(takingOrder);
  },[takingOrder])

  if(takingOrderDrawer)
  return (
    <>
    {!orderChoiceDrawer && <Overlay showOverlay={takingOrderDrawer} onClick={() => dispatch(updateControl({ takingOrderDrawer: false }))} />}
    <Drawer
    overlay={false}
    size={230}
      placement="bottom"
      open={takingOrderDrawer}
      onClose={() => dispatch(updateControl({ takingOrderDrawer: false }))}
      className="p-4 rounded-t-2xl rounded-t-3xl"
    >
      <div className="flex items-center justify-between">
        <Typography variant="h5" color="blue-gray">
          MODE RÉCUPÉRATION
        </Typography>
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={() => dispatch(updateControl({ takingOrderDrawer: false }))}
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

      <div>
        <hr />
        <Radio
          crossOrigin={undefined}
          name="type"
          label="Livraison (2€)"
          icon={<IoCheckmark className="text-green-500" />}
          checked={selected === "DELIVERY"}
          onClick={() => dispatch(updateTakingOrder(TakingOrderEnum.DELIVERY))}
          onChange={(e) => console.log(e)}
        />
        <hr />
        <Radio
          crossOrigin={undefined}
          name="type"
          label="À emporter"
          icon={<IoCheckmark className="text-green-500" />}
          checked={selected === "PICKUP"}
          onClick={() => dispatch(updateTakingOrder(TakingOrderEnum.PICKUP))}
          onChange={(e) => console.log(e)}
        />
        <hr />
      </div>
      <div className="p-2">
        <Button
          onClick={() => dispatch(updateControl({ takingOrderDrawer: false }))}
          color="blue"
          fullWidth
        >
          Enregistrer
        </Button>
      </div>
    </Drawer>
    </>
  )
};

export default TakingOrderDrawer;
