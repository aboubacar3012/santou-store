import { useEffect, useState } from 'react';

function useVerticalScroll(callback:(isScrollingUp: boolean) => void) {
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      const isScrollingUp = prevScrollPos > currentScrollPos;

      callback(isScrollingUp);

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [callback, prevScrollPos]);

  return prevScrollPos;
}

export default useVerticalScroll;
