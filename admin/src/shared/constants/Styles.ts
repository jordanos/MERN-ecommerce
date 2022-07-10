export const colors = {
  primary: "#617182",
  success: "#58BA6E", // green
  danger: "#E13C3C", // red
  warning: "#F89C1C", // orange
  fontPrimary: "#617182",
  fontSecondary: "#F4F5F7",
  background: "#f0f2f5",
  backgroundFooter: "#000",
};

export const zIndexValues = {
  dialog: 1000,
  nav: 5,
  body: 0,
};

export const font = {
  regular: 'font-family: "Roboto"; font-weight: normal;',
  light: 'font-family: "RobotoLight"; font-weight: normal;',
  bold: 'font-family: "RobotoBold";',
  black: 'font-family: "CircularStdBlack"; font-weight: normal;',
  size: (size: number) => `font-size: ${size}px;`,
};
