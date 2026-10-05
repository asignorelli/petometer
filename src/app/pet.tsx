import { useGame } from "@/context/context";
import { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";

//
//--------------  PET SCREEN ------------------------
//
export default function PetScreen() {

  //VARIABLES ---------------------------

  //step logic
  const [petName, setPetName] = useState<string>("");
  
  const [petHealth, setPetHealth] = useState<number>(100);
  const [petHappiness, setPetHappiness] = useState<number>(100);
  const { foodInventory, coinBal, eatFood, addFood } = useGame();

  useEffect(() => {
    addFood("apple", "Apple", 10);
    addFood("salad", "Salad", 25);
    addFood("banana", "Banana", 15);
  }, []);

  //PET ACTIONS ---------------------------
  function decreaseHealth(value: number) {
    if(petHappiness>80){
      value = Math.floor(value / 2);
    }
    else if(petHappiness<20){
      value = value * 2;
    }
    setPetHealth(prevHealth => prevHealth - value);
  }

  function decreaseHappiness(value: number) {
    setPetHappiness(prevHappiness => prevHappiness - value);
  }
  function increaseHealth(value: number) {
    if(petHappiness>80){
      value = value * 2;
    }
    else if(petHappiness<20){
      value = Math.floor(value / 2);
    }
    setPetHealth(prevHealth => prevHealth + value);
  }

  function increaseHappiness(value: number) {
    setPetHappiness(prevHappiness => prevHappiness + value);
  }

function feedPet(foodId: string) {
  const healthGain = eatFood(foodId);
  if (healthGain !== null) {
    increaseHealth(healthGain);
    increaseHappiness(healthGain);
  }
}

  //RENDER ---------------------------
    return (
      <View>
        <TextInput 
          value={petName}
          onChangeText={(newText) => setPetName(newText)}
          placeholder="What's its name?"
        />
        <Text>Pet Name: {petName}</Text>
        <Text>Health: {petHealth}</Text>
        <Text>Happiness: {petHappiness}</Text>
        <Text>Coins: {coinBal}</Text>
      </View>
  );
}