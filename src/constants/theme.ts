//this is used to store consistent styling for my app
//that way I dont need to repeat everything I type

export const RoomPalettes: Record<string, { primary: string; text: string; background: string }> = {
  gray: { primary: "#4A90D9", text: "#2C2C2C", background: "#FDF6E3" },
  pink: { primary: "#E06C9F", text: "#8B2252", background: "#FFF0F5" },
  black: { primary: "#555555", text: "#FFFFFF", background: "#1A1A1A" },
  blue: { primary: "#3A6EA5", text: "#1C2B3A", background: "#E6F0FA" },
  navy: { primary: "#2C3E6B", text: "#FFFFFF", background: "#DDE3F0" },
  coral: { primary: "#E8795A", text: "#5A2A1A", background: "#FFF1EC" },
  jungle: { primary: "#4C7A4C", text: "#1C3A1C", background: "#EAF4E8" },
  darkTan: { primary: "#8A6E4B", text: "#2E2418", background: "#F2E8D8" },
  purple: { primary: "#7B5EA7", text: "#2E1A47", background: "#F3EEF9" },
  tan: { primary: "#C9A876", text: "#4A3A22", background: "#F7EFE0" },
};

export const defaultPalette = RoomPalettes.gray;

export const Spacing = {
  small: 8,
  medium: 16,
  large: 24,
};
