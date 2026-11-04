import { StyleSheet } from "react-native";
import { Spacing } from "./theme";

export const sharedStyles = StyleSheet.create({
  container: { flex: 1, padding: Spacing.large },
  topRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  topRightItem: { fontSize: 16, fontFamily: "Pixgamer" },  // ← add back
  cardLabel: { marginBottom: 4, fontFamily: "Pixgamer", fontSize: 25 },
  barTrack: { height: 14, borderWidth: 1, borderColor: "#aaa", borderRadius: 7, marginBottom: 4, overflow: "hidden" },
  demoCorner: { position: "absolute", bottom: 10, right: 10 },
  bigNumber: { fontSize: 78, textAlign: "center", fontFamily: "Ithaca" },
  subText: { textAlign: "center", fontSize: 25, fontFamily: "Virtupet" },
});