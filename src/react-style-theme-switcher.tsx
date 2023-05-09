import LessThemeManager, { ThemeData, ThemeName } from "style-loader-dynamic-theme";
import { PropsWithChildren, createContext, useContext, useState } from "react";
import  useMount  from "react-use/lib/useMount";
import  useUpdateEffect from "react-use/lib/useUpdateEffect";

interface IThemeSwitcherContext {
  currentTheme: ThemeName;
  themes: ThemeData;
  switchTheme: (newThemeName: ThemeName) => void;
}

const ThemeSwitcherContext = createContext<IThemeSwitcherContext | undefined>(undefined);

interface ThemeSwitcherProviderProps {
  themeData: ThemeData;
  theme: ThemeName;
}

export function ThemeSwitcherProvider(
  props: PropsWithChildren<ThemeSwitcherProviderProps>
): JSX.Element {
  const { children, themeData, theme } = props;
  const [currentTheme, setCurrentTheme] = useState<ThemeName | undefined>();
  const [themeManager, setThemeManager] = useState<LessThemeManager | undefined>();

  useMount(() => {
    // mount
    const themeManager = new LessThemeManager({
      currentTheme: theme,
      themeData,
    });

    setThemeManager(themeManager);
  });

  function switchTheme(newThemeName: ThemeName) {
    if (themeManager) {
      // change this to return if changed theme or not
      themeManager.switchTheme(newThemeName);

      // maybe this should be cloned
      setThemeManager(themeManager);
      setCurrentTheme(newThemeName);
    }
  }

  useUpdateEffect(() => {
    if (theme && theme !== currentTheme) {
      switchTheme(theme);
    }
  }, [theme]);

  return (
    <ThemeSwitcherContext.Provider
      value={{
        currentTheme,
        themes: themeData,
        switchTheme,
      }}
    >
      {children}
    </ThemeSwitcherContext.Provider>
  );
}

export function useThemeSwitcher(): IThemeSwitcherContext {
  const context = useContext(ThemeSwitcherContext);
  if (!context) {
    throw new Error("To use `useThemeSwitcher`, component must be within a Provider");
  }
  return context;
}
