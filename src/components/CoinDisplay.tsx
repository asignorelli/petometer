import { Text } from "react-native";

//this is reused as it must appear on each screen
//this will make it easier when i want to add my assets
type ThemeColors = { text: string };

export default function CoinDisplay({ amount, themeColors }: { amount: number; themeColors: ThemeColors }) {
  return <Text style={{ fontSize: 24, color: themeColors.text, fontFamily:"Pixgamer" }}>Coins: {amount}</Text>;
}