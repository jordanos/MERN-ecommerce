import React from "react";
import ModalUi from "./ModalUi";

type Props = {
  toggleView: Function;
  active: boolean;
  children: React.ReactNode;
};

const Modal: React.FC<Props> = (props) => {
  const { active, toggleView, children } = props;

  return (
    <ModalUi active={active} toggleView={toggleView}>
      {children}
    </ModalUi>
  );
};

export default Modal;
