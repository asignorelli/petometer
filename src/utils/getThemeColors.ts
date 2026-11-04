import { RoomPalettes, defaultPalette } from "@/constants/theme";

type Room = { id: string; name: string; owned: boolean; equipped: boolean };

export function getThemeColors(rooms: Room[]) {
  const equippedRoom = rooms.find(r => r.equipped);
  const roomId = equippedRoom ? equippedRoom.id : "gray";
  return RoomPalettes[roomId] ?? defaultPalette;
}