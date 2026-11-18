import { Image, Pressable, Text, View } from "react-native";

type ThemeColors = { primary: string; text: string };

export default function GoalRow({ label, done, onPress, themeColors }: { label: string; done: boolean; onPress: () => void; themeColors: ThemeColors }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={done}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 18,
        opacity: done ? 0.6 : 1,
      }}
    >
      <Text style={{ color: "white", fontFamily: "Pixgamer", fontSize: 25 }}>
        {label}
      </Text>

      {done ? (
        <View style={{ backgroundColor: "white", borderRadius: 10, paddingVertical: 6, paddingHorizontal: 14 }}>
          <Text style={{ color: "#2C2C2C", fontFamily: "Pixgamer", fontSize: 24 }}>DONE</Text>
        </View>
      ) : (
        <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "white", borderRadius: 10, paddingVertical: 6, paddingHorizontal: 14 }}>
          <Text style={{ color: "#2C2C2C", fontFamily: "Ithaca", fontSize: 24, marginRight: 6 }}>+100</Text>
          <Image source={require('@/assets/images/icons/coin.png')} style={{ width: 24, height: 24 }} />
        </View>
      )}
    </Pressable>
  );
}