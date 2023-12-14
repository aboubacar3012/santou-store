import React, { useState } from "react";
import { useQRCode } from "next-qrcode";
import QrCodeReader from "@/components/shared/qrCodeReader";

const OrderStatus = () => {
  const { SVG } = useQRCode();
  const [qrCodeReader, setQrCodeReader] = useState(false)

  // Loraque on scanne le qrcode si la personne n'a pas paye on lui demande de payer: en affichant un dialog pour montrer les informations de la commande, et button paiement effectue ou annuler
  // Si la personne a paye on lui affiche les informations de la commande et le button deliveré et annuler
  return (
    <div>
      <button onClick={() => setQrCodeReader(!qrCodeReader)}>
        reader qrCode
      </button>
      {qrCodeReader && (
        <QrCodeReader />
      )}
      <SVG
        text="https://github.com/Bunlong/next-qrcode"
        options={{
          margin: 0,
          width: 250,
          color: {
            dark: "#000000",
            light: "#ffffff",
          },
        }}
      />
    </div>
  );
};

export default OrderStatus;
