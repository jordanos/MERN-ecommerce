/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import CountInfo from "pages/Home/CountInfo";
import React, { useEffect, useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { RiNumbersFill } from "react-icons/ri";
import { Count } from "shared/features/home/homeSlice";
import { colors } from "shared/utils/Styles";
import CardBody from "../CardBody";
import CardHeader from "../CardHeader";
import StyledSmallCard, {
  StyledClickableDiv,
  StyledOptionsItem,
} from "./Styles";

type Props = {
  title: string;
  count: Count;
};

const SmallCard: React.FC<Props> = (props) => {
  const { title, count } = props;

  const [option, setOption] = useState("today");
  const [state, setState] = useState({ count: count.today, desc: "Today" });
  const [isMenu, setIsMenu] = useState(false);

  useEffect(() => {
    if (option === "today") {
      setState({ count: count.today, desc: "Today" });
    }
    if (option === "thisWeek") {
      setState({ count: count.thisWeek, desc: "This Week" });
    }
    if (option === "thisMonth") {
      setState({ count: count.thisMonth, desc: "This Month" });
    }
  }, [count]);

  const toggleMenu = () => {
    setIsMenu((prev) => !prev);
  };

  const handleClick: React.MouseEventHandler = (e) => {
    toggleMenu();
  };

  return (
    <StyledSmallCard>
      <CardHeader>
        <h4>{title}</h4>
        <StyledClickableDiv onClick={handleClick}>
          <BiMenuAltLeft />
        </StyledClickableDiv>
        <div
          style={{
            position: "absolute",
            zIndex: "10",
            top: 40,
            right: 0,
            boxShadow: "0px 3px 13px -2px rgba(0,0,0,0.75)",
            display: isMenu ? "block" : "none",
            background: `${colors.backgroundLightest}`,
          }}
        >
          <StyledOptionsItem
            onClick={() => {
              setState({ count: count.today, desc: "Today" });
              setOption("today");
              toggleMenu();
            }}
          >
            Today
          </StyledOptionsItem>
          <StyledOptionsItem
            onClick={() => {
              setState({ count: count.thisWeek, desc: "This Week" });
              setOption("thisWeek");
              toggleMenu();
            }}
          >
            This Week
          </StyledOptionsItem>
          <StyledOptionsItem
            onClick={() => {
              setState({ count: count.thisMonth, desc: "This Month" });
              setOption("thisMonth");
              toggleMenu();
            }}
          >
            This Month
          </StyledOptionsItem>
        </div>
      </CardHeader>
      <CardBody>
        <RiNumbersFill size="48px" color={`${colors.warning}`} />
        <CountInfo count={state.count} desc={state.desc} />
      </CardBody>
    </StyledSmallCard>
  );
};

export default SmallCard;
