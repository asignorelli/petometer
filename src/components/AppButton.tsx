import { Pressable, StyleSheet, Text } from "react-native";


//app button styling for reuseable buttons!!!
//buttons are much prettier than pressable text
//may be irrelevant once assets are found or good for skeleton code

type ThemeColors = { primary: string; text: string };

type AppButtonProps = {
  onPress: () => void;
  label: string;
  disabled?: boolean;
  themeColors: ThemeColors;
};

export default function AppButton({ onPress, label, disabled, themeColors }: AppButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, { backgroundColor: disabled ? "#999" : themeColors.primary }]}
    >
      <Text style={[styles.buttonText, { color: "white" }]}>{label}</Text>
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
  },
  buttonText: { fontSize: 14, fontWeight: "600" },
});