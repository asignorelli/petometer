import AppButton from "@/components/AppButton";
import CoinDisplay from "@/components/CoinDisplay";
import { sharedStyles } from "@/constants/sharedStyles";
import { useGame } from "@/context/context";
import { getThemeColors } from "@/utils/getThemeColors";
import { useState } from "react";
import { Image, ScrollView, Text, TextInput, View } from "react-native";
//
//--------------  PET SCREEN ------------------------
//
export default function PetScreen() {

  //VARIABLES ---------------------------

  //step logic
  const [petName, setPetName] = useState<string>("");

  const [petHealth, setPetHealth] = useState<number>(100);
  const [petHappiness, setPetHappiness] = useState<number>(100);
  const { foodInventory, coinBal, resetInventory, eatFood, addFood, clothing, buyClothing, 
    equipClothing, furnitureOwned, buyFurniture, placeFurniture, rooms,
  equipRoom } = useGame();
  const themeColors = getThemeColors(rooms);
  //for display buttons opening a new tab for feeding/equipping
  const [openPanel, setOpenPanel] = useState<"food" | "clothing" | "furniture" | "room" |null>(null);

  // //for testing purposes only
  // useEffect(() => {
  //   addFood("apple", "Apple", 10);
  //   addFood("salad", "Salad", 25);
  //   addFood("banana", "Banana", 15);
  //   buyClothing("cool_hat", "Cool Hat", 10);
  //   buyFurniture("blue_chair", "Blue Chair", "chair", 5);
  //   buyFurniture("red_chair", "Red Chair", "chair", 8);
  //   buyFurniture("blue_wall", "Blue Wall", "wall", 6);
  //   buyFurniture("green_wall", "Green Wall", "wall", 7);  // second wall, for testing
  //   buyFurniture("pink_wall", "Pink Wall", "wall", 9);    // third wall, for testing
  // }, []);



  //PET ACTIONS ---------------------------

  //happiness functions
  function decreaseHappiness(value: number) {
    setPetHappiness(prevHappiness => Math.max(prevHappiness - value, 0));
  }
  function increaseHappiness(value: number) {
    setPetHappiness(prevHappiness => Math.min(prevHappiness + value, 100));
  }
  //calculate the mood boost gained from equipping clothing/furniture item
  //the effect is gained on equipped and lost on unequip
  function equipsMoodBoost(): number {
    let boost = 0;
    for (let i = 0; i < clothing.length; i++) {
      if (clothing[i].equipped) {
        boost += clothing[i].moodBoost;
      }
    }
    for (let i = 0; i < furnitureOwned.length; i++) {
      if (furnitureOwned[i].placed) {
        boost += furnitureOwned[i].moodBoost;
      }
    }
    return boost;
  }
  //separate the base happiness from the mood boost
  //this is cuz i want this to change dependent on equpping/unequipping items
  const displayHappiness = Math.min(petHappiness + equipsMoodBoost(), 100);

  //health functions
  function increaseHealth(value: number) {
    if (displayHappiness > 80) {
      value = value * 2;
    }
    else if (displayHappiness < 20) {
      value = Math.floor(value / 2);
    }
    setPetHealth(prevHealth => Math.min(prevHealth + value, 100));
  }
  function decreaseHealth(value: number) {
    if (displayHappiness > 80) {
      value = Math.floor(value / 2);
    }
    else if (displayHappiness < 20) {
      value = value * 2;
    }
    setPetHealth(prevHealth => Math.max(prevHealth - value, 0));
  }

  //feeding logic
  function feedPet(foodId: string) {
    const healthGain = eatFood(foodId);
    if (healthGain !== null) {
      increaseHealth(healthGain);
      increaseHappiness(healthGain);
    }
  }

  //handle room changing color logic
  function getRoomImage() {
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

const PANEL_HEIGHT = 150;

  //RENDER ---------------------------
return (
    <View style={{ flex: 1 }}>
      <View style={{ 
        position: "absolute", 
        width: "100%", 
        height: "100%",
        bottom: openPanel ? PANEL_HEIGHT : 0,
      }}>
        <Image
          source={getRoomImage()}
          style={{ width: "100%", height: "100%" }}
          resizeMode="cover"
        />
        <Image
          source={require('@/assets/images/cat/Idle.png')}
          style={{ position: "absolute", width: 80, height: 80, bottom: 120, left: "50%", marginLeft: -40 }}
        />
      </View>

      <View style={[sharedStyles.container, { backgroundColor: "transparent" }]}>
        <View style={sharedStyles.topRow}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: themeColors.text }}>Health: {petHealth}</Text>
            <Text style={{ color: themeColors.text }}>Happiness: {displayHappiness}</Text>
          </View>
          <CoinDisplay amount={coinBal} themeColors={themeColors} />
        </View>

        <TextInput
          value={petName}
          onChangeText={setPetName}
          placeholder="What's its name?"
          style={{ marginVertical: 8, padding: 4, color: themeColors.text }}
        />

        <View style={{ position: "absolute", right: 10, top: "40%" }}>
          <AppButton onPress={() => setOpenPanel(openPanel === "food" ? null : "food")} label="food" themeColors={themeColors} />
          <AppButton onPress={() => setOpenPanel(openPanel === "clothing" ? null : "clothing")} label="clothing" themeColors={themeColors} />
          <AppButton onPress={() => setOpenPanel(openPanel === "furniture" ? null : "furniture")} label="furniture" themeColors={themeColors} />
          <AppButton onPress={() => setOpenPanel(openPanel === "room" ? null : "room")} label="room" themeColors={themeColors} />
        </View>

        <View style={sharedStyles.demoCorner}>
          <AppButton onPress={() => decreaseHealth(50)} label="Decay HP" themeColors={themeColors} />
          <AppButton onPress={() => decreaseHappiness(50)} label="Decay Mood" themeColors={themeColors} />
          <AppButton onPress={resetInventory} label="Reset Inventory" themeColors={themeColors} />
        </View>

        {openPanel && (
          <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 150, backgroundColor: themeColors.background, padding: 10 }}>
            <AppButton onPress={() => setOpenPanel(null)} label="Close" themeColors={themeColors} />
            <ScrollView horizontal>
              {openPanel === "food" &&
                foodInventory.map(item => (
                  <AppButton key={item.id} onPress={() => feedPet(item.id)} label={`${item.name} (${item.quantity})`} themeColors={themeColors} />
                ))}
              {openPanel === "clothing" &&
                clothing.map(hat => (
                  <AppButton key={hat.id} onPress={() => equipClothing(hat.id)} label={`${hat.name}${hat.equipped ? " (Equipped)" : ""}`} themeColors={themeColors} />
                ))}
              {openPanel === "furniture" &&
                furnitureOwned.map(item => (
                  <AppButton key={item.id} onPress={() => placeFurniture(item.id)} label={`${item.name}${item.placed ? " (Equipped)" : ""}`} themeColors={themeColors} />
                ))}
              {openPanel === "room" &&
                rooms.map(room => (
                  <AppButton key={room.id} onPress={() => equipRoom(room.id)} label={`${room.name}${room.equipped ? " (Equipped)" : ""}`} themeColors={themeColors} />
                ))}
            </ScrollView>
          </View>
        )}
      </View>
    </View>
  );
}