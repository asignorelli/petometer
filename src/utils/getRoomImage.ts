type Room = {
  id: string;
  name: string;
  owned: boolean;
  equipped: boolean;
};

export function getRoomImage(rooms: Room[]) {
  const equippedRoom = rooms.find(r => r.equipped);
  const roomId = equippedRoom ? equippedRoom.id : "gray";

  switch (roomId) {
    case "gray":
      return require('@/assets/images/rooms/grayRoom.png');
    case "pink":
      return require('@/assets/images/rooms/pinkRoom.png');
    case "black":
      return require('@/assets/images/rooms/blackRoom.png');
    case "blue":
      return require('@/assets/images/rooms/blueRoom.png');
    case "navy":
      return require('@/assets/images/rooms/navyRoom.png');
    case "coral":
      return require('@/assets/images/rooms/coralRoom.png');
    case "jungle":
      return require('@/assets/images/rooms/jungleRoom.png');
    case "darkTan":
      return require('@/assets/images/rooms/darkTanRoom.png');
    default:
      return require('@/assets/images/rooms/grayRoom.png');
  }
}