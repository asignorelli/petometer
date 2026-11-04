//this is used to store consistent styling for my app
//that way I dont need to repeat everything I type

export const RoomPalettes: Record<string, { primary: string; text: string; background: string }> = {
  gray: { primary: "#808a96", text: "#131314", background: "#e6e3dc" },
  pink: { primary: "#c39090", text: "#8B2252", background: "#FFF0F5" },
  black: { primary: "#555555", text: "#FFFFFF", background: "#1A1A1A" },
  blue: { primary: "#588689", text: "#08848d", background: "#E6F0FA" },
  navy: { primary: "#718392", text: "#2d3f64", background: "#DDE3F0" },
  coral: { primary: "#ca8a76", text: "#5A2A1A", background: "#FFF1EC" },
  jungle: { primary: "#4C7A4C", text: "#1C3A1C", background: "#EAF4E8" },
  darkTan: { primary: "#8A6E4B", text: "#2E2418", background: "#F2E8D8" },
  purple: { primary: "#4d3e59", text: "#2E1A47", background: "#F3EEF9" },
  tan: { primary: "#ccb197", text: "#6c645d", background: "#F7EFE0" },
};

export const defaultPalette = RoomPalettes.gray;

export const Spacing = {
  small: 8,
  medium: 16,
  large: 24,
};
