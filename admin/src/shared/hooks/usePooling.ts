import { useEffect } from "react";

// eslint-disable-next-line @typescript-eslint/no-inferrable-types
const usePooling = (execute: Function, time: number = 3000) => {
  useEffect(() => {
    const interval = setInterval(() => execute(), time);

    return () => clearInterval(interval);
  }, []);
};

export default usePooling;
