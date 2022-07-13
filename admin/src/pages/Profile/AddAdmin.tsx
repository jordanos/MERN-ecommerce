import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "shared/components/Button";
import CustomInput from "shared/components/CustomInput/CustomInput";
import Modal from "shared/components/Modal";
import { baseUrl } from "shared/constants/const";
import { createNotification } from "shared/features/notify/notifySlice";
import useMutate from "shared/hooks/useMutate";
import { colors } from "shared/utils/Styles";
import {
  StyledModalContainer,
  StyledModalFixedWidth,
  StyledModalItem,
  StyledProfileItemTitle,
} from "./Styles";

type Props = {
  active: boolean;
  toggleView: Function;
};

const AddAdmin: React.FC<Props> = (props) => {
  const { active, toggleView } = props;
  const [data, setData] = useState({
    email: "",
    password: "",
    write: false,
    addAdmin: false,
    removeAdmin: false,
    isSuper: false,
  });

  const mutate = useMutate("post", `${baseUrl}/auth/register`);
  const dispatch = useDispatch();

  const handleSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    mutate.execute(data);
  };

  if (mutate.error) {
    dispatch(createNotification(mutate.error));
  }

  return (
    <Modal active={active} toggleView={toggleView}>
      <StyledModalContainer>
        <form onSubmit={handleSubmit}>
          <StyledModalItem>
            <CustomInput
              type="email"
              value={data.email}
              onChange={(e) =>
                setData((prev) => ({ ...prev, email: e.target.value }))
              }
              placeholder="Email ID"
            />
          </StyledModalItem>
          <StyledModalItem>
            <CustomInput
              type="password"
              value={data.password}
              onChange={(e) =>
                setData((prev) => ({ ...prev, password: e.target.value }))
              }
              placeholder="Password"
            />
          </StyledModalItem>

          <StyledModalFixedWidth>
            <StyledProfileItemTitle>Write:</StyledProfileItemTitle>
            <input
              style={{
                width: "16px",
                height: "16px",
                border: `1px solid ${colors.textPrimary}`,
                borderRadius: "4px",
                background: data.write ? colors.success : "transparent",
              }}
              type="checkbox"
              checked={data.write}
              onChange={(e) =>
                setData((prev) => ({ ...prev, write: !prev.write }))
              }
            />
          </StyledModalFixedWidth>

          <StyledModalFixedWidth>
            <StyledProfileItemTitle>Add Admin:</StyledProfileItemTitle>
            <input
              style={{
                width: "16px",
                height: "16px",
                border: `1px solid ${colors.textPrimary}`,
                borderRadius: "4px",
                background: data.addAdmin ? colors.success : "transparent",
              }}
              type="checkbox"
              checked={data.addAdmin}
              onChange={(e) =>
                setData((prev) => ({ ...prev, addAdmin: !prev.addAdmin }))
              }
            />
          </StyledModalFixedWidth>

          <StyledModalFixedWidth>
            <StyledProfileItemTitle>Remove Admin:</StyledProfileItemTitle>
            <input
              style={{
                width: "16px",
                height: "16px",
                border: `1px solid ${colors.textPrimary}`,
                borderRadius: "4px",
                background: data.removeAdmin ? colors.success : "transparent",
              }}
              type="checkbox"
              checked={data.removeAdmin}
              onChange={(e) =>
                setData((prev) => ({ ...prev, removeAdmin: !prev.removeAdmin }))
              }
            />
          </StyledModalFixedWidth>

          <StyledModalFixedWidth>
            <StyledProfileItemTitle>Super Admin:</StyledProfileItemTitle>
            <input
              style={{
                width: "16px",
                height: "16px",
                border: `1px solid ${colors.textPrimary}`,
                borderRadius: "4px",
                background: data.isSuper ? colors.success : "transparent",
              }}
              type="checkbox"
              checked={data.isSuper}
              onChange={(e) =>
                setData((prev) => ({ ...prev, isSuper: !prev.isSuper }))
              }
            />
          </StyledModalFixedWidth>
          <StyledModalItem>
            <Button loading={mutate.loading}>
              <p>Add Admin</p>
            </Button>
          </StyledModalItem>
        </form>
      </StyledModalContainer>
    </Modal>
  );
};

export default AddAdmin;
