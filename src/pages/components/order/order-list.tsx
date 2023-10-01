import { useState } from "react";
import { AiFillAccountBook } from "react-icons/ai";
import { FiChevronsRight } from "react-icons/fi";
import { GiSandsOfTime } from "react-icons/gi";
import { TbTruckDelivery } from "react-icons/tb";
import { MdDoneAll } from "react-icons/md";
import { FcCancel } from "react-icons/fc";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { Card, Typography } from "@material-tailwind/react";
import OrderComponent from "./order";

function Icon({ id, open }: { id: number; open: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}

const OrderListComponent = () => {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(0);

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  return (
    <div className="p-3 space-y-4 z-0 h-[38rem] overflow-y-scroll scroll-b">
      <div className="grid grid-cols-1 space-y-2  ">
        <OrderComponent />
        <OrderComponent />
        <OrderComponent />
        <OrderComponent />
        <OrderComponent />
        <OrderComponent />
      </div>
    </div>
  );
};

export default OrderListComponent;
