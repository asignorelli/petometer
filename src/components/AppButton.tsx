import { Colors } from "@/constants/theme";
import { Pressable, StyleSheet, Text } from "react-native";


//app button styling for reuseable buttons!!!
//buttons are much prettier than pressable text
//may be irrelevant once assets are found or good for skeleton code

//makes them pressable
type AppButtonProps = {
  onPress: () => void;
  label: string;
  disabled?: boolean;
};

//used for the button styling
export default function AppButton({ onPress, label, disabled }: AppButtonProps) {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={[styles.button, disabled && styles.buttonDisabled]}>
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    marginVertical: 4,
    alignItems: "center",
  },
  buttonDisabled: { backgroundColor: "#999" },
  buttonText: { color: "white", fontSize: 14 },
});