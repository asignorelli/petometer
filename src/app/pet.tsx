import AppButton from "@/components/AppButton";
import CoinDisplay from "@/components/CoinDisplay";
import { sharedStyles } from "@/constants/sharedStyles";
import { useGame } from "@/context/context";
import { useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
//
//--------------  PET SCREEN ------------------------
//
export default function PetScreen() {

  //VARIABLES ---------------------------

  //step logic
  const [petName, setPetName] = useState<string>("");

  const [petHealth, setPetHealth] = useState<number>(100);
  const [petHappiness, setPetHappiness] = useState<number>(100);
  const { foodInventory, coinBal, resetInventory, eatFood, addFood, clothing, buyClothing, equipClothing, furnitureOwned, buyFurniture, placeFurniture } = useGame();

  //for display buttons opening a new tab for feeding/equipping
  const [openPanel, setOpenPanel] = useState<"food" | "clothing" | "furniture" | null>(null);
  
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

  //RENDER ---------------------------
  return (
    <View style={sharedStyles.container}>
      <View style={sharedStyles.topRow}>
        <View style={{ flex: 1 }}>
          <Text>Health: {petHealth}</Text>
          <Text>Happiness: {displayHappiness}</Text>
        </View>
        <CoinDisplay amount={coinBal} />
      </View>

      <TextInput
        value={petName}
        onChangeText={setPetName}
        placeholder="What's its name?"
        style={{marginVertical: 8, padding: 4 }}
      />

      <View style={{ position: "absolute", right: 10, top: "40%" }}>
        <AppButton onPress={() => setOpenPanel(openPanel === "food" ? null : "food")} label="food" />
        <AppButton onPress={() => setOpenPanel(openPanel === "clothing" ? null : "clothing")} label="clothing" />
        <AppButton onPress={() => setOpenPanel(openPanel === "furniture" ? null : "furniture")} label="furniture" />
      </View>

      <View style={sharedStyles.demoCorner}>
        <AppButton onPress={() => decreaseHealth(50)} label="Decay HP" />
        <AppButton onPress={() => decreaseHappiness(50)} label="Decay Mood" />
        <AppButton onPress={resetInventory} label="Reset Inventory" />
      </View>

      {openPanel && (
        <View style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 150, backgroundColor: "white", padding: 10 }}>
          <AppButton onPress={() => setOpenPanel(null)} label="Close" />
          <ScrollView horizontal>
            {openPanel === "food" &&
              foodInventory.map(item => (
                <AppButton key={item.id} onPress={() => feedPet(item.id)} label={`${item.name} (${item.quantity})`} />
              ))}
            {openPanel === "clothing" &&
              clothing.map(hat => (
                <AppButton key={hat.id} onPress={() => equipClothing(hat.id)} label={`${hat.name}${hat.equipped ? " (Equipped)" : ""}`} />
              ))}
            {openPanel === "furniture" &&
              furnitureOwned.map(item => (
                <AppButton key={item.id} onPress={() => placeFurniture(item.id)} label={`${item.name}${item.placed ? " (Equipped)" : ""}`} />
              ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
