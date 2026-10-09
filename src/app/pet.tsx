import { useGame } from "@/context/context";
import { useEffect, useState } from "react";
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
  const { foodInventory, coinBal, eatFood, addFood, hats, buyHat, equipHat, furnitureOwned, buyFurniture, placeFurniture } = useGame();

  //for testing purposes only
 useEffect(() => {
  addFood("apple", "Apple", 10);
  addFood("salad", "Salad", 25);
  addFood("banana", "Banana", 15);
  buyHat("cool_hat", "Cool Hat", 10);
  buyFurniture("blue_chair", "Blue Chair", "chair", 5);
  buyFurniture("red_chair", "Red Chair", "chair", 8);
  buyFurniture("blue_wall", "Blue Wall", "wall", 6);
  buyFurniture("green_wall", "Green Wall", "wall", 7);  // second wall, for testing
  buyFurniture("pink_wall", "Pink Wall", "wall", 9);    // third wall, for testing
}, []);



  //PET ACTIONS ---------------------------

  //happiness functions
  function decreaseHappiness(value: number) {
    setPetHappiness(prevHappiness => Math.max(prevHappiness - value, 0));
  }
  function increaseHappiness(value: number) {
    setPetHappiness(prevHappiness => Math.min(prevHappiness + value, 100));
  }

  //health functions
  function increaseHealth(value: number) {
    if (petHappiness > 80) {
      value = value * 2;
    }
    else if (petHappiness < 20) {
      value = Math.floor(value / 2);
    }
    setPetHealth(prevHealth => Math.min(prevHealth + value, 100));
  }
  function decreaseHealth(value: number) {
    if (petHappiness > 80) {
      value = Math.floor(value / 2);
    }
    else if (petHappiness < 20) {
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
      <Text style={styles.paragraph}>Happiness: {petHappiness}</Text>
      <Text style={styles.paragraph}>Coins: {coinBal}</Text>

      {foodInventory.map((item) => (
        <Pressable key={item.id} onPress={() => feedPet(item.id)}>
          <Text style={styles.paragraph}>
            Feed {item.name} (+{item.healthValue}) — own {item.quantity}
          </Text>
        </Pressable>
      ))}
    
      {hats.map((hat) => (
        <Pressable key={hat.id} onPress={() => equipHat(hat.id)}>
          <Text style={styles.paragraph}>
            {hat.name} {hat.owned ? "(Owned)" : "(Not Owned)"} {hat.equipped ? "(Equipped)" : ""}
          </Text>
        </Pressable>
      ))}
      {furnitureOwned.map((furniture) => (
        <Pressable key={furniture.id} onPress={() => placeFurniture(furniture.id)}>
          <Text style={styles.paragraph}>
            {furniture.name} {furniture.owned ? "(Owned)" : "(Not Owned)"} {furniture.placed ? "(Placed)" : ""}
          </Text>
        </Pressable>
      ))}
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
