import { sharedStyles } from "@/constants/sharedStyles";
import { Text } from "react-native";

//this is reused as it must appear on each screen
//this will make it easier when i want to add my assets
export default function CoinDisplay({ amount }: { amount: number }) {
  return <Text style={sharedStyles.topRightItem}>Coins: {amount}</Text>;
}