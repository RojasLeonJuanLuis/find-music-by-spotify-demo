import { useState, useEffect } from 'react';

function useMobile() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const setWidth = () => {
      window.innerWidth <= 769 ? setMobile(true) : setMobile(false);
    };
    window.addEventListener('resize', setWidth);
    window.addEventListener('load', setWidth);
    return () => {
      window.removeEventListener('resize', setWidth);
      window.removeEventListener('load', setWidth);
    };
  });

  return [mobile];
}
export default useMobile;
