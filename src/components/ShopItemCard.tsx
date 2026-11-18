import { darkenColor } from "@/utils/colorHelpers";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
type ThemeColors = { primary: string; text: string };

type ShopItemCardProps = {
  name: string;
  cost: number;
  icon?: any;
  iconSize?: number;
  disabled?: boolean;
  onPress: () => void;
  themeColors: ThemeColors;
  active?: boolean;
};

export default function ShopItemCard({ name, cost, icon, iconSize = 100, disabled, onPress, themeColors, active }: ShopItemCardProps) {
  const backgroundColor = disabled
    ? "#999"
    : active
      ? darkenColor(themeColors.primary, 70) // darker than resting
      : darkenColor(themeColors.primary, 40); // resting state, explicit number for clarity
  return (
    <Pressable onPress={onPress} disabled={disabled} style={[styles.card, { backgroundColor }]}>
      <View style={styles.iconSlot}>
        {icon &&
          <Image source={icon}
            style={{ width: `${iconSize}%`, height: `${iconSize}%`, alignSelf: "center" }}
            resizeMode="contain"
          />}
      </View>
      <Text style={styles.name} numberOfLines={1}>{name}</Text>
      <View style={styles.priceRow}>
        <Image source={require('@/assets/images/icons/coin.png')} style={styles.coinIcon} />
        <Text style={styles.price}>{cost}</Text>
      </View>

      {disabled && (
        <View style={styles.soldOverlay}>
          <Text style={styles.soldText}>SOLD</Text>
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 140,
    borderRadius: 10,
    padding: 6,
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    overflow: "hidden",
  },
  soldOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  soldText: {
    color: "white",
    fontSize: 16,
    fontWeight: "800",
    fontFamily: "Pixgamer",
  },
  iconSlot: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "Ithaca",
  },
  price: {
    color: "white",
    fontSize: 14,
    fontWeight: "700",
    fontFamily: "Pixgamer",
    right: 3,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  coinIcon: {
    width: 12,
    height: 12,
    top: 1,
    right: 3,
  },
});