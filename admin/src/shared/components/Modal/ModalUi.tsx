import React from "react";
import { zIndexValues } from "shared/utils/Styles";
import StyledModal from "./Styles";

type Props = {
  toggleView: Function;
  active: boolean;
  children: React.ReactNode;
};

const ModalUi: React.FC<Props> = ({ active, toggleView, children }) => {
  return (
    <>
      {/* modal background */}
      <StyledModal
        className="modal-bg"
        active={active}
        onClick={() => toggleView()}
      />
      {/* actual modal */}
      <div
        style={{
          position: "relative",
          left: "30%",
          top: `20%`,
          width: "100px",
          display: active ? "block" : "none",
          zIndex: zIndexValues.modal,
        }}
      >
        {children}
      </div>
    </>
  );
};

export default ModalUi;
