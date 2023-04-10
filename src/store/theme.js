import { createContext, useState } from "react";

export const ThemeContext = createContext({
  colorIndex: Number,
  changeTheme: () => {},
});

const ThemeContextProvider = ({ children }) => {
  const [colorIndex, setColorIndex] = useState(0);

  const changeTheme = (colorIndex) => {
    setColorIndex(colorIndex);
  };

  const contextValue = {
    colorIndex,
    changeTheme,
  };
  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
