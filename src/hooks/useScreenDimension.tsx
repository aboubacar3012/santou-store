import { useState, useEffect } from 'react';

const useScreenDimension = () => {
  const [dimension, setDimension] = useState<number>();

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

  return dimension;
};

export default useScreenDimension;
