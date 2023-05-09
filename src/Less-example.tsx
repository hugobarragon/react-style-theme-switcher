import React, {  useMemo } from "react";
import { ThemeSwitcherProvider } from "./react-style-theme-switcher";
import {ThemeData} from "style-loader-dynamic-theme"

const blueTheme = import("./less-themes/blue.lazy.less");
const darkTheme = import("./less-themes/dark.lazy.less");
const greenTheme = import("./less-themes/green.lazy.less");
const redTheme = import("./less-themes/red.lazy.less");

const DEFAULT_THEME = "blue";

function LessThemeSwitcherHandler(props: React.PropsWithChildren<unknown>): JSX.Element {

//   const [theme, setTheme] = useState( DEFAULT_THEME);


  const themeData: ThemeData = useMemo(
    () => ({
      blue: blueTheme,
      dark: darkTheme,
      green: greenTheme,
      red: redTheme,
    }),
    []
  );

  return (
    <ThemeSwitcherProvider theme={DEFAULT_THEME} themeData={themeData}>
      {props.children}
    </ThemeSwitcherProvider>
  );
}

export default LessThemeSwitcherHandler;
