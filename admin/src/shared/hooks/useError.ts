import { useEffect } from "react";

const useError = (error: any, setError: Function) => {
  useEffect(() => {
    if (error.error) setError(error);
  }, [error]);
};

export default useError;
