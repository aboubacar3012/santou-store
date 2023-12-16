import React from 'react'
import { FcCancel } from 'react-icons/fc'
import { FiChevronsRight } from 'react-icons/fi'
import { GiSandsOfTime } from 'react-icons/gi'
import { MdDoneAll } from 'react-icons/md'
import { IoBicycle } from 'react-icons/io5'

type OrderStatusStepProps = {
  orderStatus:string
}

const OrderStatusStep = ({orderStatus}:OrderStatusStepProps) => {
  return (
    <div>
      <ol className="flex items-center w-full py-2 space-x-2 text-sm font-sm text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400  dark:bg-gray-800 dark:border-gray-700 ">
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
            EN PRÉPARATION
            <FiChevronsRight className="h-4 w-4" />
          </li>
          <li
            className={`flex items-center text-xs ${
              orderStatus === "SHIPPED" && "text-blue-600 dark:text-blue-500"
            }`}
          >
            <IoBicycle
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
    </div>
  )
}

export default OrderStatusStep
