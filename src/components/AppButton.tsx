//app button styling for reuseable buttons!!!
//buttons are much prettier than pressable text
//may be irrelevant once assets are found or good for skeleton code
import { darkenColor } from "@/utils/colorHelpers";
import { Pressable, StyleSheet, Text } from "react-native";

type ThemeColors = { primary: string; text: string };

type AppButtonProps = {
  onPress: () => void;
  label: string;
  disabled?: boolean;
  active?: boolean;
  fullWidth?: boolean;
  variant?: "default" | "square";
  themeColors: ThemeColors;
};

export default function AppButton({ onPress, label, disabled, active, fullWidth, variant = "default", themeColors }: AppButtonProps) {
  const backgroundColor = disabled
    ? "#999"
    : active
    ? darkenColor(themeColors.primary)
    : themeColors.primary;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        variant === "square" ? styles.squareButton : styles.button,
        fullWidth && styles.buttonFullWidth,
        { backgroundColor },
      ]}
    >
      <Text style={styles.buttonText} numberOfLines={2}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginVertical: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  squareButton: {
    width: 70,
    height: 70,
    borderRadius: 10,
    marginVertical: 4,
    marginHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonFullWidth: {
    width: "100%",
    height: 44,
  },
  buttonText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: 2,
  },
});