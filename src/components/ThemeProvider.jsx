"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import ThemeToggle from "./ThemeToggle";

const ThemeContext = createContext(undefined);
export function ThemeProvider({ children, ...props }) {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = React.useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
  }, []);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      return newTheme;
    });
  };

  const value = {
    theme,
    toggleTheme,
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="w-10 h-10"></div>; 
  }

  return (
    <ThemeContext.Provider value={value}>
      <div
        className={`min-h-screen bg-gradient-to-br  ${
          theme === "dark"
            ? "from-gray-800 via-gray-900 to-black"
            : "from-blue-100 via-purple-100 to-pink-100"
        } font-sans transition-colors duration-300`}
      >
        <div className="fixed top-4 right-4 z-50">
          <ThemeToggle theme={theme} toggleTheme={() => toggleTheme()} />
        </div>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error(
      "useThemeContext must be used within a ThemeProvider"
    );
  }
  return context;
}
