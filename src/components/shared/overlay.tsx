import React, { useEffect } from "react";

type OverlayProps = {
  showOverlay: boolean;
  onClick: () => void;
}



const Overlay = ({ showOverlay, onClick }: OverlayProps) => {
  useEffect(() => {
    if(showOverlay) document.body.classList.add("overflow-hidden")
    else document.body.classList.remove("overflow-hidden")
  },[showOverlay])

  const overlayStyle = showOverlay
    ? "fixed inset-0 bg-black bg-opacity-50 z-50 overflow-hidden"
    : "hidden";

  return <div className={overlayStyle} onClick={onClick}></div>;
};

export default Overlay;
