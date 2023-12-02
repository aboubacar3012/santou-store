'use client';
import React, { Dispatch, SetStateAction, useState } from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Chip,
} from '@material-tailwind/react';
import { ShowOrderDialog } from './show-order-dialog';
import { Card, Typography } from '@material-tailwind/react';
import Select from 'react-select';
import formatFrenchDate from '../formatDate';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import IsMobileDevice from '@/hooks/isMobileDevice';
import { OrderStatusEnum, OrderType } from '@/types/order.type';
import { getColorByType, getOrdersByStatus } from '@/utils/ordersFunc';


type Order = { value: string; label: string };


function Icon({ id, open }: { id: number; open: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        id === open ? 'rotate-180' : ''
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

type OrdersAccordionProps = {
  orders: OrderType[];
  selectedSearchOrder: Order | null;
  setSelectedSearchOrder: Dispatch<SetStateAction<Order | null>>;
  selectedOrder: OrderType | null;
  setSelectedOrder: Dispatch<SetStateAction<OrderType | null>>;
  open: number;
  setOpen: Dispatch<SetStateAction<number>>;
  showOrderDialog:boolean;
  setShowOrderDialog:Dispatch<SetStateAction<boolean>>;
};

export function OrdersAccordion({orders, selectedSearchOrder, setSelectedSearchOrder, selectedOrder, setSelectedOrder, open, setOpen, showOrderDialog, setShowOrderDialog}: OrdersAccordionProps) {
  // const [open, setOpen] = useState(0);
  // const [showOrderDialog, setShowOrderDialog] = useState(false);
  // const [selectedOrder, setSelectedOrder] = useState<OrderType | null>(null);
  // const [selectedSearchOrder, setSelectedSearchOrder] = useState<Order | null>(
  //   null,
  // );
  const isMobile = IsMobileDevice();
  // const mode = useSelector((state: RootState) => state.filter.mode);
  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  const TABLE_HEAD = ['N°', 'Client', 'type'];



  const bodyByStatus = (status: string) => {
    return (
      <Card className="h-[20rem] w-full overflow-y-scroll ">
        <table className="w-full  table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
              {status === 'planified' && (
                <th
                  key="date"
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    Date
                  </Typography>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {getOrdersByStatus(status, orders).map(
              (order, index) => (
                <tr
                  onClick={() => {
                    setShowOrderDialog(!showOrderDialog);
                    setSelectedOrder(order);
                    
                  }}
                  key={order.orderNumber}
                  className={`cursor-pointer  hover:bg-orange-50/50 ${
                    order.orderNumber === selectedSearchOrder?.value
                      ? 'bg-red-400'
                      : 'even:bg-blue-gray-50/50'
                  } `}
                >
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {order.orderNumber}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {isMobile ? "" : order.user.firstName} {order.user.lastName}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Chip color={getColorByType(order.takingOrder)} value={order.takingOrder === "DELIVERY" ? "LIVRAISON": "À EMPORTER"} />
                  </td>
                  {status === 'planified' && order.createdAt && (
                    <td className="p-4">
                      <Chip color="teal" value={formatFrenchDate(order.createdAt) ?? ""} />
                    </td>
                  )}
                </tr>
              ),
            )}
          </tbody>
        </table>
      </Card>
    );
  };

  return (
    <div className="w-full px-3">
      {/* Commande en cours de preparation */}
      <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
        <AccordionHeader className={isMobile ? "text-sm" : ""} onClick={() => handleOpen(1)}>
          Commandes en cours de préparation ({getOrdersByStatus(OrderStatusEnum.PENDING, orders).length})
        </AccordionHeader>
        <AccordionBody>
          {getOrdersByStatus(OrderStatusEnum.PENDING, orders).length > 0
            ? bodyByStatus(OrderStatusEnum.PENDING)
            : 'Aucune commande actuellement'}
        </AccordionBody>
      </Accordion>

      {/* Commande prêtes a etre livree */}
      <Accordion open={open === 2} icon={<Icon id={2} open={open} />}>
        <AccordionHeader className={isMobile ? "text-sm" : ""} onClick={() => handleOpen(2)}>
          Commandes prêtes prête à être livrée ({getOrdersByStatus(OrderStatusEnum.SHIPPED, orders).length})
        </AccordionHeader>
        <AccordionBody >
          {getOrdersByStatus(OrderStatusEnum.SHIPPED, orders).length > 0
            ? bodyByStatus(OrderStatusEnum.SHIPPED)
            : 'Aucune commande actuellement'}
        </AccordionBody>
      </Accordion>

      {/* Commande livrée */}
      <Accordion open={open === 3} icon={<Icon id={3} open={open} />}>
        <AccordionHeader className={isMobile ? "text-sm" : ""} onClick={() => handleOpen(3)}>
          Commandes livrée ({getOrdersByStatus(OrderStatusEnum.DELIVERED, orders).length})
        </AccordionHeader>
        <AccordionBody>
          {getOrdersByStatus(OrderStatusEnum.DELIVERED, orders).length > 0
            ? bodyByStatus(OrderStatusEnum.DELIVERED)
            : 'Aucune commande actuellement'}
        </AccordionBody>
      </Accordion>

      {/* Commande annulées */}
      <Accordion open={open === 4} icon={<Icon id={4} open={open} />}>
        <AccordionHeader className={isMobile ? "text-sm" : ""} onClick={() => handleOpen(4)}>
          Commandes annulée ({getOrdersByStatus(OrderStatusEnum.CANCELLED, orders).length})
        </AccordionHeader>
        <AccordionBody>
          {getOrdersByStatus(OrderStatusEnum.CANCELLED, orders).length > 0
            ? bodyByStatus(OrderStatusEnum.CANCELLED)
            : 'Aucune commande actuellement'}
        </AccordionBody>
      </Accordion>
   

      <ShowOrderDialog
        order={selectedOrder}
        open={showOrderDialog}
        setOpen={setShowOrderDialog}
      />
    </div>
  );
}
