import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "shared/constants/const";
import { login } from "shared/features/auth/authSlice";
import { createNotification } from "shared/features/notify/notifySlice";
import useMutate from "shared/hooks/useMutate";
import LoginPageUi from "./Ui";

const LoginPage: React.FC = () => {
  const dispatch = useDispatch();
  const { loading, error, data, execute } = useMutate(
    "post",
    `${baseUrl}/auth/login`
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    if (email === "" || password === "") {
      setEmail("");
      setPassword("");
      return dispatch(
        createNotification({ error: "Email or password field is empty" })
      );
    }

    return execute({ email, password });
  };
  if (error) {
    dispatch(createNotification(error));
  }

  if (data) {
    dispatch(login(data));
    navigate("/home");
  }

  return (
    <LoginPageUi
      handleSubmit={handleSubmit}
      loading={loading}
      inputs={{ email, setEmail, password, setPassword }}
    />
  );
};

export default LoginPage;
