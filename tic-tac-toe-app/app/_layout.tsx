import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "../context/themeContext"

export default function RootLayout() {
  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <Stack screenOptions={{headerShown: true}}>
          <Stack.Screen name="index" options={{title: "Game Board" }} />
          <Stack.Screen name="history" options={{title: "Game History"}}/>
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  )
}
