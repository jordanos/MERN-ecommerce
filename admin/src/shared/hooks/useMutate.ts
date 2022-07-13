import axios from "axios";
import { useSelector } from "react-redux";
import { Auth } from "shared/features/auth/authSlice";
import { getError } from "shared/helpers/ntw";
import useNtwStates from "./useNtwStates";
import { ReqReturn } from "./useQuery";

const useMutate = (
  method: "get" | "post" | "put" | "delete",
  url: string
): ReqReturn => {
  const auth: Auth = useSelector((state: any) => state.auth);

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
          Authorization: auth.token || "",
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
