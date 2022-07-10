import React from "react";

interface Props {
  count: Number;
  desc?: String | null;
}

const CountInfo: React.FC<Props> = ({ count, desc }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-end",
      }}
    >
      <div style={{ fontSize: "2rem", fontWeight: 700 }}>{`${count}`}</div>
      {desc && (
        <div
          style={{
            fontSize: "0.75rem",
            marginBottom: "0.5em",
            marginLeft: "0.5em",
          }}
        >
          {desc}
        </div>
      )}
    </div>
  );
};

CountInfo.defaultProps = {
  desc: null,
};

export default CountInfo;
