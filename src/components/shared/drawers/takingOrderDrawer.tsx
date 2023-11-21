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

const TakingOrderDrawer = () => {
  const [selected, setSelected] = useState<"delivery" | "pickup" | null>(null);
  const dispatch = useDispatch();
  const takingOrderDrawer = useSelector(
    (state: RootState) => state.controls.values.takingOrderDrawer
  );
  const takingOrder = useSelector((state: RootState) => state.auth.takingOrder);

  useEffect(() => {
    setSelected(takingOrder);
  },[takingOrder])

  return (
    <Drawer
      placement="bottom"
      open={takingOrderDrawer}
      onClose={() => dispatch(updateControl({ takingOrderDrawer: false }))}
      className="p-4 rounded-t-2xl rounded-t-3xl"
    >
      <div className="flex items-center justify-between">
        <Typography variant="h5" color="blue-gray">
          RÉCUPÉRATION
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
          crossOrigin={false}
          name="type"
          label="Livraison"
          icon={<IoCheckmark className="text-green-500" />}
          checked={selected === "delivery"}
          onClick={() => dispatch(updateTakingOrder("delivery"))}
        />
        <hr />
        <Radio
          crossOrigin={false}
          name="type"
          label="À emporter"
          icon={<IoCheckmark className="text-green-500" />}
          checked={selected === "pickup"}
          onClick={() => dispatch(updateTakingOrder("pickup"))}
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
  );
};

export default TakingOrderDrawer;
