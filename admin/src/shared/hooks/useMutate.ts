import axios from "axios";
import { getLocalToken } from "shared/helpers/auth";
import { getError } from "shared/helpers/ntw";
import useNtwStates from "./useNtwStates";
import { ReqReturn } from "./useQuery";

const useMutate = (
  method: "get" | "post" | "put" | "delete",
  url: string
): ReqReturn => {
  const { loading, setLoading, error, setError, data, setData } =
    useNtwStates();

  const execute = async (reqData: any, newUrl?: string) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res: any = await axios({
        method,
        url: newUrl || url,
        data: reqData,
        headers: {
          Authorization: getLocalToken(),
        },
      });
      setLoading(false);
      if (res.status >= 300) {
        throw new Error(res.data.error);
      }
      setData(res.data);
    } catch (e: any) {
      setLoading(false);
      setError(getError(e));
    }
  };

  return { loading, error, data, execute };
};

export default useMutate;
