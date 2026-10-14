import { StyleSheet } from "react-native";
import { Colors, Spacing } from "./theme";

//these are for certian types of styles that pop up often
//trying to prevent more work being needed in the future
export const sharedStyles = StyleSheet.create({
  container: { flex: 1, padding: Spacing.medium, backgroundColor: Colors.background },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  topRightItem: { fontSize: 16, color: Colors.text },
  cardLabel: { marginBottom: 4, color: Colors.text },
  barTrack: { height: 14, borderWidth: 1, borderColor: "#aaa", borderRadius: 7, marginBottom: 4, overflow: "hidden" },
  demoCorner: { position: "absolute", bottom: 10, right: 10 },
  bigNumber: { fontSize: 48, textAlign: "center", color: Colors.text },
  subText: { textAlign: "center", color: Colors.text },
});