import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Notify } from "shared/features/notify/notifySlice";

const Init: React.FC = () => {
  const notify: Notify = useSelector((state: any) => state.notify);

  useEffect(() => {
    if (notify.error) {
      toast(`${notify.error}`);
    }
  }, [notify]);

  return <ToastContainer position="bottom-left" />;
};

export default Init;
