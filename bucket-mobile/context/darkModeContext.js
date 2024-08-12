import React, { createContext, useState, useContext, useEffect } from "react";
import * as SecureStore from "expo-secure-store";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  const toggleTheme = async () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    await SecureStore.setItemAsync(
      "theme",
      theme === "light" ? "dark" : "light"
    );
  };
  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await SecureStore.getItemAsync("theme");
      setTheme(storedTheme);
    };
    loadTheme();
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
