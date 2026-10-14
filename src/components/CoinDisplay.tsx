import { sharedStyles } from "@/constants/sharedStyles";
import { Text } from "react-native";

export default function CoinDisplay({ amount }: { amount: number }) {
  return <Text style={sharedStyles.topRightItem}>Coins: {amount}</Text>;
}