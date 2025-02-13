import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import { Colors, Theme } from "../constants/Colors"

interface ThemeContextType {
  theme: Theme;
  colorScheme: "light" | "dark";
  setColorScheme: Dispatch<SetStateAction<"light" | "dark">>;
}

// 2️⃣ Create Context with Proper Default Value
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const [colorScheme, setColorScheme] = useState<"light" | "dark">(
        Appearance.getColorScheme() ?? "light" // Fallback to "light"
    )
    const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

    return (
        <ThemeContext.Provider value={{ theme, colorScheme, setColorScheme }}>
            {children}
        </ThemeContext.Provider>
    );
};
