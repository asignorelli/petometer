import { formatCoinAmount } from "@/utils/formatNumber";
import { Image, Text, View } from "react-native";
//this is reused as it must appear on each screen
//this will make it easier when i want to add my assets
type ThemeColors = { text: string };


export default function CoinDisplay({ amount, themeColors }: { amount: number; themeColors: ThemeColors }) {
  return (
    <View style={{ width: 100, height: 42, justifyContent: "center" }}>
      <View
        style={{
          position: "absolute",
          left: 28,
          right: 11,
          top: 10,
          bottom: 10,
          backgroundColor: "rgb(251, 249, 249)",
          borderRadius: 6,
        }}
      />
      <Image
        source={require('@/assets/images/icons/coin_box.png')}
        style={{ position: "absolute", width: "110%", height: "110%" }}
        resizeMode="contain"
      />
      <Text style={{ fontSize: 20, color: "black", textAlign: "center", marginLeft: 38, fontFamily: "Ithaca" }}>
        {formatCoinAmount(amount)}
      </Text>
    </View>
  );
}