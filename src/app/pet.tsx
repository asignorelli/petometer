import AppButton from "@/components/AppButton";
import CoinDisplay from "@/components/CoinDisplay";
import { sharedStyles } from "@/constants/sharedStyles";
import { useGame } from "@/context/context";
import { getThemeColors } from "@/utils/getThemeColors";
import { useRef, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
//
//--------------  PET SCREEN ------------------------
//
export default function PetScreen() {

  //VARIABLES ---------------------------

  //step logic
  const [petHealth, setPetHealth] = useState<number>(100);
  const [petHappiness, setPetHappiness] = useState<number>(100);
  const { foodInventory, coinBal, resetInventory, eatFood, addFood, clothing, buyClothing,
    equipClothing, furnitureOwned, buyFurniture, placeFurniture, rooms,
    equipRoom } = useGame();
  const themeColors = getThemeColors(rooms);

  //handle eating "animation" lol
  const [isEating, setIsEating] = useState(false);
  const eatingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  //for display buttons opening a new tab for feeding/equipping
  const [openPanel, setOpenPanel] = useState<"food" | "clothing" | "furniture" | "room" | null>(null);

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

  //feeding actions
  const bowIdleImages: Record<string, any> = {
    ribbon_blue: require('@/assets/images/cat/bluebow_idle.png'),
    ribbon_brown: require('@/assets/images/cat/brownbow_idle.png'),
    ribbon_green: require('@/assets/images/cat/greenbow_idle.png'),
    ribbon_pink: require('@/assets/images/cat/pinkbow_idle.png'),
    ribbon_purple: require('@/assets/images/cat/purplebow_idle.png'),
    ribbon_red: require('@/assets/images/cat/redbow_idle.png'),
    ribbon_white: require('@/assets/images/cat/whitebow_idle.png'),
    ribbon_yellow: require('@/assets/images/cat/yellowbow_idle.png'),
  };

  const bowEatImages: Record<string, any> = {
    ribbon_blue: require('@/assets/images/cat/bluebow_eat.png'),
    ribbon_brown: require('@/assets/images/cat/brownbow_eat.png'),
    ribbon_green: require('@/assets/images/cat/greenbow_eat.png'),
    ribbon_pink: require('@/assets/images/cat/pinkbow_eat.png'),
    ribbon_purple: require('@/assets/images/cat/purplebow_eat.png'),
    ribbon_red: require('@/assets/images/cat/redbow_eat.png'),
    ribbon_white: require('@/assets/images/cat/whitebow_eat.png'),
    ribbon_yellow: require('@/assets/images/cat/yellowbow_eat.png'),
  };

  function getCatImage() {
    const equippedBow = clothing.find(c => c.equipped);
    const bowId = equippedBow ? equippedBow.id : null;

    if (isEating) {
      if (bowId && bowEatImages[bowId]) {
        return bowEatImages[bowId];
      }
      return require('@/assets/images/cat/eat.png');
    }

    if (bowId && bowIdleImages[bowId]) {
      return bowIdleImages[bowId];
    }
    return require('@/assets/images/cat/Idle.png');
  }

  //for furniture items
  function isPlaced(id: string): boolean {
    return furnitureOwned.some(f => f.id === id && f.placed);
  }

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

      setIsEating(true);

      if (eatingTimeoutRef.current) {
        clearTimeout(eatingTimeoutRef.current);
      }
      eatingTimeoutRef.current = setTimeout(() => {
        setIsEating(false);
      }, 2000);
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
      case "purple":
        return require('@/assets/images/rooms/purpleRoom.png');
      case "tan":
        return require('@/assets/images/rooms/tanRoom.png');
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
        {isPlaced("catbed") && (
          <Image source={require('@/assets/images/furniture/catbed.png')} style={{ position: "absolute", width: 110, height: 110, bottom: 20, left: 20 }} resizeMode="contain" />
        )}
        {isPlaced("cathouse") && (
          <Image source={require('@/assets/images/furniture/cathouse.png')} style={{ position: "absolute", width: 150, height: 300, bottom: 50, left: "6%"}} resizeMode="contain" />
        )}
        {isPlaced("cattree") && (
          <Image source={require('@/assets/images/furniture/cattree.png')} style={{ position: "absolute", width: 150, height: 250, bottom: 100, left: "60%" }} resizeMode="contain" />
        )}
        {isPlaced("lamp") && (
          <Image source={require('@/assets/images/furniture/lamp.png')} style={{ position: "absolute", width: 80, height: 80, top: 30, left: "40%" }} resizeMode="contain" />
        )}
        {isPlaced("mousetoy") && (
          <Image source={require('@/assets/images/furniture/mousetoy.png')} style={{ position: "absolute", width: 40, height: 40, bottom: 25, left: 115 }} resizeMode="contain" />
        )}
        {isPlaced("painting") && (
          <Image source={require('@/assets/images/furniture/painting.png')} style={{ position: "absolute", width: 70, height: 70, top: 170, left: "90%", marginLeft: -20 }} resizeMode="contain" />
        )}
        {isPlaced("plant") && (
          <Image source={require('@/assets/images/furniture/plant.png')} style={{ position: "absolute", width: 145, height: 145, bottom: 85, left:"75%" }} resizeMode="contain" />
        )}
        {isPlaced("scratchpost") && (
          <Image source={require('@/assets/images/furniture/scratchpost.png')} style={{ position: "absolute", width: 70, height: 70, bottom: 25, left: 225 }} resizeMode="contain" />
        )}
        {isPlaced("window") && (
          <Image source={require('@/assets/images/furniture/window.png')} style={{ position: "absolute", width: 120, height: 120, top: 190, left: "35%" }} resizeMode="contain" />
        )}
        <Image
          source={getCatImage()}
          style={
            isEating
              ? { position: "absolute", width: 80, height: 100, bottom: 85, left: "54%", marginLeft: -50 }
              : { position: "absolute", width: 80, height: 100, bottom: 90, left: "54%", marginLeft: -50 }
          }
          resizeMode="contain"
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

        <View style={{ position: "absolute", left:0, top: "20%" }}>
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
            <ScrollView horizontal contentContainerStyle={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}>
              {openPanel === "food" && foodInventory.length === 0 && (
                <Text style={{ color: themeColors.text, textAlign: "center", fontSize: 14, paddingHorizontal: 20 }}>
                  Visit the marketplace to buy food!
                </Text>
              )}
              {openPanel === "food" &&
                foodInventory.map(item => (
                  <AppButton
                    key={item.id}
                    onPress={() => feedPet(item.id)}
                    label={`${item.name} (${item.quantity})`}
                    themeColors={themeColors}
                    variant="square"
                  />
                ))}

              {openPanel === "clothing" && clothing.length === 0 && (
                <Text style={{ color: themeColors.text, textAlign: "center", fontSize: 14, paddingHorizontal: 20 }}>
                  Visit the marketplace to buy clothes!
                </Text>
              )}
              {openPanel === "clothing" &&
                clothing.map(hat => (
                  <AppButton
                    key={hat.id}
                    onPress={() => equipClothing(hat.id)}
                    label={hat.name}
                    active={hat.equipped}
                    themeColors={themeColors}
                    variant="square"
                  />
                ))}

              {openPanel === "furniture" && furnitureOwned.length === 0 && (
                <Text style={{ color: themeColors.text, textAlign: "center", fontSize: 14, paddingHorizontal: 20 }}>
                  Visit the marketplace to buy furniture!
                </Text>
              )}
              {openPanel === "furniture" &&
                furnitureOwned.map(item => (
                  <AppButton
                    key={item.id}
                    onPress={() => placeFurniture(item.id)}
                    label={item.name}
                    active={item.placed}
                    themeColors={themeColors}
                    variant="square"
                  />
                ))}

              {openPanel === "room" && rooms.length === 0 && (
                <Text style={{ color: themeColors.text, textAlign: "center", fontSize: 14, paddingHorizontal: 20 }}>
                  Visit the marketplace to buy more rooms!
                </Text>
              )}
              {openPanel === "room" &&
                rooms.map(room => (
                  <AppButton
                    key={room.id}
                    onPress={() => equipRoom(room.id)}
                    label={room.name}
                    active={room.equipped}
                    themeColors={themeColors}
                    variant="square"
                  />
                ))}
            </ScrollView>
            <AppButton onPress={() => setOpenPanel(null)} label="Close" fullWidth themeColors={themeColors} />
          </View>
        )}
      </View>
    </View>
  );
}