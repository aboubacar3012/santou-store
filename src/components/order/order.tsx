import { Dispatch, SetStateAction, useState } from "react";
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
import { Select, Option } from "@material-tailwind/react";
import { OrderType } from "@/types/order.type";
import { formatDate } from "@/utils/format-date";
import { updateOrderByIdService } from "@/services/orders";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

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

const isMerchantUser = true;

type OrderComponentProps = {
  order: OrderType;
  isAdmin?: boolean;
  setStatusChanged: Dispatch<SetStateAction<boolean>>;
  statusChanged: boolean;
};

const OrderComponent = ({
  order,
  isAdmin,
  setStatusChanged,
  statusChanged,
}: OrderComponentProps) => {
  const [orderStatus, setOrderStatus] = useState<
    "PENDING" | "SHIPPED" | "DELIVERED" | "CANCELLED"
  >(order.orderStatus);

  const [openProductAccordion, setOpenProductAccordion] = useState(0);
  const [openUserDetailsAccordion, setOpenUserDetailsAccordion] = useState(0);
  const [openMerchantDetailsAccordion, setOpenMerchantDetailsAccordion] =
    useState(0);
  const user = useSelector((state: RootState) => state.auth.user);
  const token = useSelector((state: RootState) => state.auth.token);

  const handleOpenProductAccordion = (value: number) =>
    setOpenProductAccordion(openProductAccordion === value ? 0 : value);

  const handleOpenUserDetailsAccordion = (value: number) =>
    setOpenUserDetailsAccordion(openUserDetailsAccordion === value ? 0 : value);

  const handleOpenMerchantDetailsAccordion = (value: number) =>
    setOpenMerchantDetailsAccordion(
      openMerchantDetailsAccordion === value ? 0 : value
    );

  if (!order || (user?.role === "USER" && order.user?.id !== user?.id))
    return null;

  const TABLE_HEAD = ["Nom du produit", "Prix", "Quantité", "Image"];

  const TABLE_ROWS = order.products.map((product) => {
    return {
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: product.quantity,
    };
  });

  const handleUpdateOrder = async (id: string, order: any) => {
    const response = await updateOrderByIdService(id, order, token);
    if (response.success) {
      setOrderStatus(response.order.orderStatus);
    }
  };

  return (
    <div>
      <div className=" space-y-2 bg-white shadow-md border border-gray-500 rounded-2xl p-2">
        <ol className="flex items-center w-full py-1 space-x-2 text-sm font-sm text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400  dark:bg-gray-800 dark:border-gray-700 ">
          <li
            className={`flex items-center text-xs ${
              orderStatus === "PENDING" && "text-blue-600 dark:text-blue-500"
            }`}
          >
            <GiSandsOfTime
              className={`flex items-center justify-center w-5 h-5 mr-2   ${
                orderStatus === "PENDING" &&
                "border-blue-600 dark:border-blue-500"
              }  shrink-0 `}
            />
            EN ATTENTE
            <FiChevronsRight className="h-4 w-4" />
          </li>
          <li
            className={`flex items-center text-xs ${
              orderStatus === "SHIPPED" && "text-blue-600 dark:text-blue-500"
            }`}
          >
            <TbTruckDelivery
              className={`flex items-center justify-center w-5 h-5 mr-2 text-xs  ${
                orderStatus === "SHIPPED" &&
                "border-blue-600 dark:border-blue-500"
              }  shrink-0 `}
            />
            EN LIVRAISON
            <FiChevronsRight className="h-4 w-4" />
          </li>
          {orderStatus !== "CANCELLED" && (
            <li
              className={`flex items-center text-xs ${
                orderStatus === "DELIVERED" &&
                "text-blue-600 dark:text-blue-500"
              }`}
            >
              <MdDoneAll
                className={`flex items-center justify-center w-5 h-5 mr-2 text-xs  ${
                  orderStatus === "DELIVERED" &&
                  "border-blue-600 dark:border-blue-500"
                }  shrink-0 `}
              />
              LIVRÉ
            </li>
          )}

          {orderStatus === "CANCELLED" && (
            <li
              className={`flex items-center ${
                orderStatus === "CANCELLED" &&
                "text-blue-600 dark:text-blue-500"
              }`}
            >
              <FcCancel
                className={`flex items-center justify-center w-5 h-5 mr-2 text-xs  ${
                  orderStatus === "CANCELLED" &&
                  "border-blue-600 dark:border-blue-500"
                }  shrink-0 `}
              />
              ANNULÉ
            </li>
          )}
        </ol>
        <hr className="border-gray-500" />
        <div className="flex flex-col">
          <div className="flex justify-between">
            <div><strong>Vendeur</strong>: AfroGraille</div>
            <div><strong>Prix TTC:</strong> {order.totalAmount/100}€</div>
          </div>
          <div>
            <strong>Client</strong>: {order.user?.firstName} {order.user?.lastName}
          </div>
          <div><strong>Commande n°:</strong> {order.orderNumber.toLowerCase()}</div>
          <div><strong>Commande effectue le:</strong> {formatDate(order.orderDate)}</div>

          {isAdmin && (
            <div className="mt-3">
              <Select
                className="flex items-center"
                label="Changer le status de la commande"
                value={orderStatus}
                // disabled={
                //   orderStatus === "CANCELLED" || orderStatus === "DELIVERED"
                // }
                onChange={(e) => {
                  handleUpdateOrder(order.id, { orderStatus: e });
                  setStatusChanged(!statusChanged);
                }}
              >
                <Option
                  value="PENDING"
                  className="flex justify-start items-center"
                >
                  EN ATTENTE
                </Option>
                <Option
                  value="SHIPPED"
                  className="flex justify-start items-center"
                >
                  EN COURS
                </Option>
                <Option
                  value="DELIVERED"
                  className="flex justify-start items-center"
                >
                  LIVRÉ
                </Option>
                <Option
                  value="CANCELLED"
                  className="flex justify-start items-center"
                >
                  ANNULÉ
                </Option>
              </Select>
            </div>
          )}
        </div>
        {/* Client Details Accordion */}
        {/* {isMerchantUser && (
          <Accordion
            open={openUserDetailsAccordion === 1}
            icon={<Icon id={1} open={openUserDetailsAccordion} />}
          >
            <AccordionHeader
              className="py-0"
              onClick={() => handleOpenUserDetailsAccordion(1)}
            >
              Informations Client
            </AccordionHeader>
            <AccordionBody className="py-0">
              <UserDetails user={user} />
            </AccordionBody>
          </Accordion>
        )} */}

        {/* Merchant Details Accordion */}
        {/* {!isMerchantUser && (
          <Accordion
            open={openMerchantDetailsAccordion === 1}
            icon={<Icon id={1} open={openMerchantDetailsAccordion} />}
          >
            <AccordionHeader
              className="py-0"
              onClick={() => handleOpenMerchantDetailsAccordion(1)}
            >
              Informations Vendeur
            </AccordionHeader>
            <AccordionBody className="py-0">
              <UserDetails user={user} />
            </AccordionBody>
          </Accordion>
        )} */}

        {/* Products Accordion */}
        <Accordion
          open={openProductAccordion === 1}
          icon={<Icon id={1} open={openProductAccordion} />}
        >
          <AccordionHeader
            className="py-0"
            onClick={() => handleOpenProductAccordion(1)}
          >
            Produits
          </AccordionHeader>
          <AccordionBody className="py-0">
            <Card className="h-full w-full overflow-scroll mt-2">
              <table className="w-full min-w-max table-auto text-left">
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
                  </tr>
                </thead>
                <tbody>
                  {TABLE_ROWS.map(({ name, price, image, quantity }, index) => (
                    <tr key={name} className="even:bg-blue-gray-50/50 text-center">
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {name}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {price/100} €
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {quantity}
                        </Typography>
                      </td>
                      {/* <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {color}
                        </Typography>
                      </td> */}
                      {/* <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {sex}
                        </Typography>
                      </td> */}
                      <td className="p-4">
                        <img
                          src={image}
                          alt={name}
                          className="w-10 h-10 rounded-md"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </AccordionBody>
        </Accordion>
      </div>
    </div>
  );
};

export default OrderComponent;
