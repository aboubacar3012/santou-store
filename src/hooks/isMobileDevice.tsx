import { useState, useEffect } from 'react';

const IsMobileDevice = () => {
  const [dimension, setDimension] = useState<number>(0);

  const resizeFunction = () => {
    setDimension(window.innerWidth);
  };

  useEffect(() => {
    resizeFunction();

    window.addEventListener('resize', resizeFunction);

    return () => {
      window.addEventListener('resize', resizeFunction);
    };
  }, []);

  return dimension < 768 ? true : false;
};

export default IsMobileDevice;
