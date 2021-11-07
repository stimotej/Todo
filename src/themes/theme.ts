interface ThemeType {
  background: string;
  main: string;
  text: string;
  textLight: string;
  divider: string;
  backdropColor: string;
}

const lightTheme = {
  background: "#F5F5F5",
  main: "#EEEEEE",
  text: "#000000",
  textLight: "rgba(0, 0, 0, 0.5)",
  divider: "rgba(0, 0, 0, 0.2)",
  backdropColor: "rgba(238, 238, 238, 0.4)",
};

const darkTheme = {
  background: "#424242",
  main: "#757575",
  text: "#FFFFFF",
  textLight: "rgba(255, 255, 255, 0.5)",
  divider: "rgba(255, 255, 255, 0.2)",
  backdropColor: "rgba(66, 66, 66, 0.4)",
};

export { lightTheme, darkTheme, ThemeType };
