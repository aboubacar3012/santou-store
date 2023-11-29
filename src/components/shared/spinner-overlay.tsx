import { Progress } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';

type SpinnerOverlayProps = {
  show: boolean;
}

const SpinnerOverlay = ({ show }:SpinnerOverlayProps) => {
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (show) {
      // Augmente la valeur de progression de 1% toutes les 100ms (5s pour atteindre 100%)
      interval = setInterval(() => {
        setProgressValue((prevValue) => {
          const newValue = prevValue + 1;
          return newValue <= 98 ? newValue : 98;
        });
      }, 50);
    } else {
      // Réinitialise la valeur de progression quand le composant se cache
      setProgressValue(0);
    }

    return () => clearInterval(interval); // Nettoie l'intervalle lors du démontage du composant
  }, [show]);
  
  return (
    <div>
      
    <div
      id="spinner-overlay"
      className={`fixed inset-0 flex flex-col items-center justify-center z-50 ${show ? '' : 'hidden'}`}
    > 
      <div className="animate-spin mb-5 rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      <Progress color="blue" value={progressValue} className="w-48 border-none" />
    </div>
    </div>
  );
};

export default SpinnerOverlay;
