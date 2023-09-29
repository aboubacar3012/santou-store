import React from "react";

const UnavailableComponent = () => {
  return (
    <div className="h-[36rem] flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">
          Pas disponible pour le moment
        </h1>
        <h1 className="text-xl">Revenez plus tard</h1>
      </div>
    </div>
  );
};

export default UnavailableComponent;
