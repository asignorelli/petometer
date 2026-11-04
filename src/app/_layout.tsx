import { GameProvider } from "@/context/context";
import { useFonts } from "expo-font";
import { Tabs } from "expo-router";
import { ActivityIndicator } from "react-native";

export default function RootLayout() {

  const [fontsLoaded] = useFonts({
    "Ithaca": require("C:\\Users\\alyss\\petometer\\assets\\fonts\\Ithaca.ttf"),
    "Pixgamer": require("C:\\Users\\alyss\\petometer\\assets\\fonts\\Pixgamer.ttf"),
    "Virtupet": require("C:\\Users\\alyss\\petometer\\assets\\fonts\\Virtupet.ttf")
  });

  //loading if font no load
  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <GameProvider>
      <Tabs>
      <Tabs.Screen
        name="index"
        options={{ title: "Steps" }}
      />
      <Tabs.Screen
        name="pet"
        options={{ title: "Pet" }}
      />
      <Tabs.Screen
        name="marketplace"
        options={{ title: "Marketplace" }}
      />
      </Tabs>
    </GameProvider>
  );
}