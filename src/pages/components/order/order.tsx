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
import { Select, Option } from "@material-tailwind/react";
import UserDetails from "../profile/user-details";
import { user } from "../../screens/profile-screen";

const TABLE_HEAD = ["Name", "Job", "Employed", ""];

const TABLE_ROWS = [
  {
    name: "John Michael",
    job: "Manager",
    date: "23/04/18",
  },
  {
    name: "Alexa Liras",
    job: "Developer",
    date: "23/04/18",
  },
  {
    name: "Laurent Perrier",
    job: "Executive",
    date: "19/09/17",
  },
  {
    name: "Michael Levi",
    job: "Developer",
    date: "24/12/08",
  },
  {
    name: "Richard Gran",
    job: "Manager",
    date: "04/10/21",
  },
];

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

const isMerchantUser = false;

const OrderComponent = () => {
  const [step, setStep] = useState(1);
  const [openProductAccordion, setOpenProductAccordion] = useState(0);
  const [openUserDetailsAccordion, setOpenUserDetailsAccordion] = useState(0);
  const [openMerchantDetailsAccordion, setOpenMerchantDetailsAccordion] =
    useState(0);

  const handleOpenProductAccordion = (value: number) =>
    setOpenProductAccordion(openProductAccordion === value ? 0 : value);

  const handleOpenUserDetailsAccordion = (value: number) =>
    setOpenUserDetailsAccordion(openUserDetailsAccordion === value ? 0 : value);

  const handleOpenMerchantDetailsAccordion = (value: number) =>
    setOpenMerchantDetailsAccordion(
      openMerchantDetailsAccordion === value ? 0 : value
    );

  return (
    <div>
      <div className=" space-y-2 bg-white shadow-md border border-gray-500 rounded-2xl p-2">
        <ol className="flex items-center w-full p-1 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4">
          <li
            className={`flex items-center ${
              step === 1 && "text-blue-600 dark:text-blue-500"
            }`}
          >
            <GiSandsOfTime
              className={`flex items-center justify-center w-5 h-5 mr-2 text-xs  ${
                step === 1 && "border-blue-600 dark:border-blue-500"
              }  shrink-0 `}
            />
            EN ATTENTE
            <FiChevronsRight className="h-4 w-4" />
          </li>
          <li
            className={`flex items-center ${
              step === 2 && "text-blue-600 dark:text-blue-500"
            }`}
          >
            <TbTruckDelivery
              className={`flex items-center justify-center w-5 h-5 mr-2 text-xs  ${
                step === 1 && "border-blue-600 dark:border-blue-500"
              }  shrink-0 `}
            />
            EN COURS
            <FiChevronsRight className="h-4 w-4" />
          </li>
          <li
            className={`flex items-center ${
              step === 3 && "text-blue-600 dark:text-blue-500"
            }`}
          >
            <MdDoneAll
              className={`flex items-center justify-center w-5 h-5 mr-2 text-xs  ${
                step === 1 && "border-blue-600 dark:border-blue-500"
              }  shrink-0 `}
            />
            LIVRÉ
          </li>

          {/* <li
          className={`flex items-center ${
            step === 3 && "text-blue-600 dark:text-blue-500"
          }`}
          onClick={() => setStep(3)}
        >
          <FcCancel
            className={`flex items-center justify-center w-5 h-5 mr-2 text-xs  ${
              step === 1 && "border-blue-600 dark:border-blue-500"
            }  shrink-0 `}
          />
          ANNULÉ
        </li> */}
        </ol>
        <hr className="border-gray-500" />
        <div className="flex flex-col">
          <div className="flex justify-between">
            <div>Vendeur: AfriStore</div>
            <div>Prix TTC: 18.00E</div>
          </div>
          <div>Commande n° 0001</div>
          <div>Date: {new Date().toLocaleDateString()}</div>

          {isMerchantUser && (
            <div className="mt-3">
              <Select
                className="flex items-center"
                label="Changer le status de la commande"
              >
                <Option className="flex justify-start items-center">
                  EN ATTENTE
                </Option>
                <Option className="flex justify-start items-center">
                  EN COURS
                </Option>
                <Option className="flex justify-start items-center">
                  LIVRÉ
                </Option>
                <Option className="flex justify-start items-center">
                  ANNULÉ
                </Option>
              </Select>
            </div>
          )}
        </div>
        {/* Client Details Accordion */}
        {isMerchantUser && (
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
        )}

        {/* Merchant Details Accordion */}
        {!isMerchantUser && (
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
        )}

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
            <Card className="h-full w-full overflow-scroll">
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
                  {TABLE_ROWS.map(({ name, job, date }, index) => (
                    <tr key={name} className="even:bg-blue-gray-50/50">
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
                          {job}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {date}
                        </Typography>
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
