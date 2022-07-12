import { useState } from "react";

interface Return {
  loading: boolean;
  error: any | null;
  data: any;
  setLoading: Function;
  setError: Function;
  setData: Function;
}

const useNtwStates = (): Return => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  return { loading, setLoading, error, setError, data, setData };
};

export default useNtwStates;
