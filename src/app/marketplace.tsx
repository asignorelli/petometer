import { useGame } from "@/context/context";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

//
//-------------- MARKETPLACE LOGIC ---------------------------
//

//redefine types of shop items to avoid typescript errors
//i love u typescript
type FoodItem = {
  id: string;
  name: string;
  type: "food";
  cost: number;
  healthValue: number;
};

type ClothingItem = {
  id: string;
  name: string;
  type: "clothing";
  cost: number;
  moodBoost: number;
};

type FurnitureItem = {
  id: string;
  name: string;
  type: "furniture";
  cost: number;
  category: string;
  moodBoost: number;
};

type ShopItem = FoodItem | ClothingItem | FurnitureItem;

export default function MarketplaceScreen() {

  //VARIABLES----------------------
  const { spendCoins, addFood, buyClothing, buyFurniture, coinBal, clothing, furnitureOwned, foodInventory } = useGame();

  const shopItems: ShopItem[] = [
    { id: "apple", name: "Apple", type: "food", cost: 20, healthValue: 10 },
    { id: "salad", name: "Salad", type: "food", cost: 40, healthValue: 25 },
    { id: "cool_hat", name: "Cool Hat", type: "clothing", cost: 100, moodBoost: 10 },
    { id: "blue_chair", name: "Blue Chair", type: "furniture", category: "chair", cost: 80, moodBoost: 5 },
  ];

  const [selectedCategory, setSelectedCategory] = useState<"food" | "clothing" | "furniture">("food");

  const filteredItems = shopItems.filter(item => item.type === selectedCategory);

  //FUNCTIONS----------------------
  //blocks purchases for 2 conditions
  //FOOD: you already own 99 of the item and trying to get 100
  //CLOTHING/FURNITURE: you own the specific item and trying to buy another
  function isBlocked(item: ShopItem): boolean {

    //food items max at 99
    if(item.type === "food"){
      for(let i=0; i<foodInventory.length; i++){
        if(foodInventory[i].id === item.id && foodInventory[i].quantity >= 99){
          return true;
        }
      }
    }
    //clothing and furniture can only own 1 of each
    if(item.type==="clothing"){
      for(let i=0; i<clothing.length; i++){
        if(clothing[i].id === item.id && clothing[i].owned){
          return true;
        }
      }
    }
    if(item.type==="furniture"){
      for(let i=0; i<furnitureOwned.length; i++){
        if(furnitureOwned[i].id === item.id && furnitureOwned[i].owned){
          return true;
        }
      }
    }
    return false;
  }

  //BUYING LOGIC
  //main function for market,, cuz u,,buy things
  function buyItem(itemId: string) {

    //find the item in the shop by its ID
    const item = shopItems.find(item => item.id === itemId);
    if (!item) {
      return false;
    }

    //check if already owned/maxed out first, if so, break 
    if (isBlocked(item)) {
      return false; 
    }
    //attempt to buy it
    const success = spendCoins(item.cost);
    if (!success) {
      return false; //haha broke
    }
    //add to inventory based on type
    if (item.type === "food") {
      addFood(item.id, item.name, item.healthValue);
    }
    else if (item.type === "clothing") {
      buyClothing(item.id, item.name, item.moodBoost);
    }
    else if (item.type === "furniture") {
      buyFurniture(item.id, item.name, item.category, item.moodBoost);
    }
    return true;
  }

//RENDER-----------------------------------
  return (
    <View>
      <Text style={styles.paragraph}>Coins: {coinBal}</Text>

      <View style={{ flexDirection: "row" }}>
        <Pressable onPress={() => setSelectedCategory("food")}>
          <Text style={styles.paragraph}>Food</Text>
        </Pressable>
        <Pressable onPress={() => setSelectedCategory("clothing")}>
          <Text style={styles.paragraph}>Clothing</Text>
        </Pressable>
        <Pressable onPress={() => setSelectedCategory("furniture")}>
          <Text style={styles.paragraph}>Furniture</Text>
        </Pressable>
      </View>
      {filteredItems.map((item) => (
        <Pressable key={item.id} onPress={() => buyItem(item.id)}>
          <Text style={styles.paragraph}>
            Buy {item.name} ({item.type}) - Cost: {item.cost}
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
