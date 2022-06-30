import Color from "color";
import { css } from "styled-components";

export const breakpoints = {
  mobile: "768px",
};

export const colors = {
  primary: "#FF9900", // orange
  success: "#58BA6E", // green
  danger: "#E13C3C", // red
  warning: "#F89C1C", // orange
  secondary: "#F4F5F7", // light grey

  textPrimary: "#FF9900",
  textSecondary: "#682696",
  textDarkest: "#000",
  textDark: "#283d50",
  textMute: "#ecf5ff",
  textMedium: "#5E6C84",
  textLight: "#444",
  textLightest: "#fff",
  textLink: "#0052cc",

  backgroundDarkest: "#000",
  backgroundDark: "#FB8694",
  backgroundMedium: "#FFE6EA",
  backgroundLight: "#ebecf0",
  backgroundLightest: "#fff",
  backgroundLightPrimary: "#D2E5FE",

  borderLightest: "#dfe1e6",
  borderLight: "#C1C7D0",
  borderInputFocus: "#4c9aff",
};

// export const issueTypeColors = {
//   [IssueType.TASK]: '#4FADE6', // blue
//   [IssueType.BUG]: '#E44D42', // red
//   [IssueType.STORY]: '#65BA43', // green
// };

// export const issuePriorityColors = {
//   [IssuePriority.HIGHEST]: '#CD1317', // red
//   [IssuePriority.HIGH]: '#E9494A', // orange
//   [IssuePriority.MEDIUM]: '#E97F33', // orange
//   [IssuePriority.LOW]: '#2D8738', // green
//   [IssuePriority.LOWEST]: '#57A55A', // green
// };

// export const issueStatusColors = {
//   [IssueStatus.BACKLOG]: color.textDark,
//   [IssueStatus.INPROGRESS]: '#fff',
//   [IssueStatus.SELECTED]: color.textDark,
//   [IssueStatus.DONE]: '#fff',
// };

// export const issueStatusBackgroundColors = {
//   [IssueStatus.BACKLOG]: color.backgroundMedium,
//   [IssueStatus.INPROGRESS]: color.primary,
//   [IssueStatus.SELECTED]: color.backgroundMedium,
//   [IssueStatus.DONE]: color.success,
// };

export const sizes = {
  appNavBarLeftWidth: "64px",
  secondarySideBarWidth: "230px",
  minViewportWidth: "1000px",
  cardWidth: "350px",
  navHeight: "56px",
  dashboardProgressSize: "490px",
  calendarDayWidth: "114px",
};

export const zIndexValues = {
  modal: 1000,
  dropdown: 101,
  sidebar: 5,
  navHeader: 2,
  loading: 2000,
};

export const font = {
  regular: 'font-family: "AlongSans"; font-weight: normal;',
  light: 'font-family: "RobotoLight"; font-weight: normal;',
  bold: 'font-family: "RobotoBold";',
  black: 'font-family: "CircularStdBlack"; font-weight: normal;',
  size: (size: number) => `font-size: ${size}px;`,
};

export const mixin = {
  darken: (colorValue: any, amount: any) =>
    Color(colorValue).darken(amount).string(),
  lighten: (colorValue: any, amount: any) =>
    Color(colorValue).lighten(amount).string(),
  rgba: (colorValue: any, opacity: any) =>
    Color(colorValue).alpha(opacity).string(),
  boxShadowMedium: css`
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
  `,
  boxShadowDropdown: css`
    box-shadow: rgba(9, 30, 66, 0.25) 0px 4px 8px -2px,
      rgba(9, 30, 66, 0.31) 0px 0px 1px;
  `,
  truncateText: css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `,
  clickable: css`
    cursor: pointer;
    user-select: none;
  `,
  hardwareAccelerate: css`
    transform: translateZ(0);
  `,
  cover: css`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  `,
  placeholderColor: (colorValue: any) => css`
    ::-webkit-input-placeholder {
      color: ${colorValue} !important;
      opacity: 1 !important;
    }
    :-moz-placeholder {
      color: ${colorValue} !important;
      opacity: 1 !important;
    }
    ::-moz-placeholder {
      color: ${colorValue} !important;
      opacity: 1 !important;
    }
    :-ms-input-placeholder {
      color: ${colorValue} !important;
      opacity: 1 !important;
    }
  `,
  scrollableY: css`
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  `,
  customScrollbar: ({
    width = 8,
    background = colors.backgroundMedium,
  } = {}) => css`
    &::-webkit-scrollbar {
      width: ${width}px;
    }
    &::-webkit-scrollbar-track {
      background: none;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 99px;
      background: ${background};
    }
  `,
  backgroundImage: (imageURL: string) => css`
    background-image: url("${imageURL}");
    background-position: 50% 50%;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: ${colors.backgroundLight};
  `,
  link: (colorValue = colors.textLink) => css`
    cursor: pointer;
    color: ${colorValue};
    ${font.regular}
    &:hover, &:visited, &:active {
      color: ${colorValue};
    }
    &:hover {
      text-decoration: underline;
    }
  `,
  tag: (
    background = colors.backgroundMedium,
    colorValue = colors.textDarkest
  ) => css`
    display: inline-flex;
    align-items: center;
    height: 24px;
    padding: 0 8px;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
    color: ${colorValue};
    background: ${background};
    ${font.bold}
    ${font.size(12)}
    i {
      margin-left: 4px;
    }
  `,
};
