import React, { useState, useEffect } from 'react';
type ToastProps = {
  message: string;
};
const Toast = ({ message}: ToastProps) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  console.log("toast")

  return (
    <div className={`z-50 fixed bottom-0 right-0 transform -translate-x-1/2 bg-red-500 text-white p-4 rounded ${visible ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 ease-in-out`}>
      {message}
    </div>
  );
};

export default Toast;
