import React, { useEffect, useState } from 'react';
import OneSignal from 'react-onesignal';

const OneSignalComponent = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initOneSignal = async () => {
      await OneSignal.init({ appId: '2156b6be-cab1-4c7c-8614-bc85911677cb' });
      setInitialized(true);
      OneSignal.Slidedown.promptPush();
      // Faire d'autres actions après l'initialisation
    };

    initOneSignal();

    // Cleanup on component unmount
    return () => {
      // Faire des opérations de nettoyage si nécessaire
    };
  }, []); // Le tableau vide assure que cela s'exécute une seule fois lors du montage

  return (
    // <div>
    //   {initialized ? (
    //     <p>OneSignal initialized. You can now receive push notifications.</p>
    //   ) : (
    //     <p>Initializing OneSignal...</p>
    //   )}
    // </div>
    <></>
  );
};

export default OneSignalComponent;
