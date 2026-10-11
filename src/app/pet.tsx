import { useGame } from "@/context/context";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

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
    for(let i = 0; i < clothing.length; i++){
      if(clothing[i].equipped){
        boost += clothing[i].moodBoost;
      }
    }
    for(let i = 0; i < furnitureOwned.length; i++){
      if(furnitureOwned[i].placed){
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
  //map is used for the food/clothes/furniture as a way to dynamically change the inventory
  return (
    <View>
      <TextInput
        value={petName}
        onChangeText={(newText) => setPetName(newText)}
        placeholder="What's its name?"
      />
      <Text style={styles.paragraph}>Pet Name: {petName}</Text>
      <Text style={styles.paragraph}>Health: {petHealth}</Text>
      <Text style={styles.paragraph}>Happiness: {displayHappiness}</Text>
      <Text style={styles.paragraph}>Coins: {coinBal}</Text>

      {foodInventory.map((item) => (
        <Pressable key={item.id} onPress={() => feedPet(item.id)}>
          <Text style={styles.paragraph}>
            Feed {item.name} (+{item.healthValue}) — own {item.quantity}
          </Text>
        </Pressable>
      ))}
      {clothing.map((hat) => (
        <Pressable key={hat.id} onPress={() => equipClothing(hat.id)}>
          <Text style={styles.paragraph}>
            {hat.name} {hat.equipped ? "(Equipped)" : ""}
          </Text>
        </Pressable>
      ))}
      {furnitureOwned.map((item) => (
        <Pressable key={item.id} onPress={() => placeFurniture(item.id)}>
          <Text style={styles.paragraph}>
            {item.name} {item.placed ? "(Placed)" : ""}
          </Text>
        </Pressable>
      ))}
      <Pressable onPress={() => decreaseHealth(50)}>
        <Text style={styles.paragraph}>Decay Health(-50 Health)</Text>
      </Pressable>
      <Pressable onPress={() => decreaseHappiness(50)}>
        <Text style={styles.paragraph}>Decay Happiness(-50 Happiness)</Text>
      </Pressable>
      <Pressable onPress={() => resetInventory()}>
        <Text style={styles.paragraph}>Reset Inventory</Text>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  paragraph: {
    margin: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
