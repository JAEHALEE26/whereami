import { useState } from "react";

export const useButtonClickCount = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prevCount) => prevCount + 1);
  };

  return { count, handleClick };
};
