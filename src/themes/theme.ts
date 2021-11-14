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
  accent: "#000000",
  accentText: "#FFFFFF",
  error: "#B00020",
  success: "#30d158",
  textLight: "rgba(0, 0, 0, 0.5)",
  divider: "rgba(0, 0, 0, 0.2)",
  actionBarColor: "rgba(245, 245, 245, 0.4)",
  backdropColor: "rgba(189, 189, 189, 0.4)",
};

const darkTheme = {
  background: "#212121",
  main: "#424242",
  text: "#FFFFFF",
  accent: "#E0E0E0",
  accentText: "#000000",
  error: "#B00020",
  success: "#30d158",
  textLight: "rgba(255, 255, 255, 0.5)",
  divider: "rgba(255, 255, 255, 0.2)",
  actionBarColor: "rgba(33, 33, 33, 0.4)",
  backdropColor: "rgba(66, 66, 66, 0.4)",
};

export { lightTheme, darkTheme, ThemeType };
