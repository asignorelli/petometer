import { darkenColor } from "@/utils/colorHelpers";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type ThemeColors = { primary: string; text: string };

type InventoryItemCardProps = {
  name: string;
  icon?: any;
  active?: boolean;
  quantity?: number;
  onPress: () => void;
  themeColors: ThemeColors;
};

export default function InventoryItemCard({ name, icon, active, quantity, onPress, themeColors }: InventoryItemCardProps) {
  const backgroundColor = active ? darkenColor(themeColors.primary) : themeColors.primary;

  return (
    <Pressable onPress={onPress} style={[styles.card, { backgroundColor }]}>
      <View style={styles.iconSlot}>
        {icon && <Image source={icon} style={{ width: "100%", height: "100%" }} resizeMode="contain" />}
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {quantity !== undefined ? `x${quantity}` : name}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginVertical: 4,
    marginHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
    padding: 6,
  },
  iconSlot: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    color: "white",
    fontSize: 10,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "Pixgamer",
  },
});