import React, { useEffect } from "react";
import { Alert } from "@material-tailwind/react";
type color =
  | "blue-gray"
  | "gray"
  | "brown"
  | "deep-orange"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "light-green"
  | "green"
  | "teal"
  | "cyan"
  | "light-blue"
  | "blue"
  | "indigo"
  | "deep-purple"
  | "purple"
  | "pink"
  | "red";

interface NotificationProps {
  message: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | null>>;
  color: color;
}

const NotificationMessage = ({
  message,
  setErrorMessage,
  color,
}: NotificationProps) => {
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setErrorMessage(null);
  //   }, 3000);
  //   return () => clearTimeout(timer);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [message]);

  if (!message) return null;

  return (
    <div id="payment-message" className="flex justify-center items-center py-2">
      <Alert color={color}>{message}</Alert>
    </div>
  );
};

export default NotificationMessage;
