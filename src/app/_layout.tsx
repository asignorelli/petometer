import { GameProvider } from "@/context/context";
import { Tabs } from "expo-router";

export default function RootLayout() {
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