import AppButton from "@/components/AppButton";
import CoinDisplay from "@/components/CoinDisplay";
import { sharedStyles } from "@/constants/sharedStyles";
import { useGame } from "@/context/context";
import { getThemeColors } from "@/utils/getThemeColors";
import { useState } from "react";
import { View } from "react-native";

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

type RoomItem = {
  id: string;
  name: string;
  type: "room";
  cost: number;
}

type ShopItem = FoodItem | ClothingItem | FurnitureItem | RoomItem;

export default function MarketplaceScreen() {

  //VARIABLES----------------------
  const { spendCoins, addFood, buyClothing, buyFurniture, buyRoom,
    coinBal, clothing, furnitureOwned, foodInventory, rooms } = useGame();
  const themeColors = getThemeColors(rooms);

  const shopItems: ShopItem[] = [
    //clothes
    { id: "ribbon_blue", name: "Blue Ribbon", type: "clothing", cost: 80, moodBoost: 8 },
    { id: "ribbon_brown", name: "Brown Ribbon", type: "clothing", cost: 80, moodBoost: 8 },
    { id: "ribbon_green", name: "Green Ribbon", type: "clothing", cost: 80, moodBoost: 8 },
    { id: "ribbon_pink", name: "Pink Ribbon", type: "clothing", cost: 80, moodBoost: 8 },
    { id: "ribbon_purple", name: "Purple Ribbon", type: "clothing", cost: 80, moodBoost: 8 },
    { id: "ribbon_red", name: "Red Ribbon", type: "clothing", cost: 80, moodBoost: 8 },
    { id: "ribbon_white", name: "White Ribbon", type: "clothing", cost: 80, moodBoost: 8 },
    { id: "ribbon_yellow", name: "Yellow Ribbon", type: "clothing", cost: 80, moodBoost: 8 },
  
    //food
    { id: "salmon", name: "Salmon", type: "food", cost: 50, healthValue: 25 },
    { id: "chicken", name: "Chicken", type: "food", cost: 40, healthValue: 20 },
    { id: "tuna", name: "Tuna", type: "food", cost: 45, healthValue: 22 },
    { id: "pumpkin", name: "Pumpkin", type: "food", cost: 25, healthValue: 12 },
    { id: "egg", name: "Egg", type: "food", cost: 30, healthValue: 15 },
    { id: "carrot", name: "Carrot", type: "food", cost: 20, healthValue: 10 },
    { id: "blueberries", name: "Blueberries", type: "food", cost: 35, healthValue: 18 },
    { id: "spinach", name: "Spinach", type: "food", cost: 22, healthValue: 11 },
    { id: "sweet_potato", name: "Sweet Potato", type: "food", cost: 28, healthValue: 14 },

    //furniture
    { id: "catbed", name: "Cat Bed", type: "furniture", category: "catbed", cost: 120, moodBoost: 12 },
    { id: "cathouse", name: "Cat Tower", type: "furniture", category: "cathouse", cost: 200, moodBoost: 18 },
    { id: "cattree", name: "Cat Tree", type: "furniture", category: "cattree", cost: 220, moodBoost: 20 },
    { id: "lamp", name: "Lamp", type: "furniture", category: "lamp", cost: 60, moodBoost: 6 },
    { id: "mousetoy", name: "Mouse Toy", type: "furniture", category: "mousetoy", cost: 40, moodBoost: 5 },
    { id: "painting", name: "Painting", type: "furniture", category: "painting", cost: 90, moodBoost: 9 },
    { id: "plant", name: "Plant", type: "furniture", category: "plant", cost: 70, moodBoost: 7 },
    { id: "scratchpost", name: "Scratch Post", type: "furniture", category: "scratchpost", cost: 110, moodBoost: 11 },
    { id: "window", name: "Window", type: "furniture", category: "window", cost: 80, moodBoost: 8 },
   
    //rooms
    { id: "pink", name: "Pink Room", type: "room", cost: 200 },
    { id: "black", name: "Black Room", type: "room", cost: 200 },
    { id: "blue", name: "Blue Room", type: "room", cost: 200 },
    { id: "navy", name: "Navy Room", type: "room", cost: 200 },
    { id: "coral", name: "Coral Room", type: "room", cost: 200 },
    { id: "jungle", name: "Jungle Room", type: "room", cost: 200 },
    { id: "darkTan", name: "Dark Tan Room", type: "room", cost: 200 },
    { id: "purple", name: "Purple Room", type: "room", cost: 200 },
    { id: "tan", name: "Tan Room", type: "room", cost: 200 },
  ];

  const [selectedCategory, setSelectedCategory] = useState<"food" | "clothing" | "furniture" | "room">("food");

  const filteredItems = shopItems.filter(item => item.type === selectedCategory);

  //FUNCTIONS----------------------
  //blocks purchases for 2 conditions
  //FOOD: you already own 99 of the item and trying to get 100
  //CLOTHING/FURNITURE: you own the specific item and trying to buy another
  function isBlocked(item: ShopItem): boolean {

    //food items max at 99
    if (item.type === "food") {
      for (let i = 0; i < foodInventory.length; i++) {
        if (foodInventory[i].id === item.id && foodInventory[i].quantity >= 99) {
          return true;
        }
      }
    }
    //clothing and furniture can only own 1 of each
    if (item.type === "clothing") {
      for (let i = 0; i < clothing.length; i++) {
        if (clothing[i].id === item.id && clothing[i].owned) {
          return true;
        }
      }
    }
    if (item.type === "furniture") {
      for (let i = 0; i < furnitureOwned.length; i++) {
        if (furnitureOwned[i].id === item.id && furnitureOwned[i].owned) {
          return true;
        }
      }
    }
    if (item.type === "room") {
      for (let i = 0; i < rooms.length; i++) {
        if (rooms[i].id === item.id && rooms[i].owned) {
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
    else if (item.type === "room") {
      buyRoom(item.id, item.name);
    }
    return true;
  }

  //RENDER-----------------------------------
  return (
    <View style={[sharedStyles.container, { backgroundColor: themeColors.background }]}>
      <View style={sharedStyles.topRow}>
        <View style={{ flex: 1 }} />
        <CoinDisplay amount={coinBal} themeColors={themeColors} />
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-around", marginVertical: 8, flexWrap: "wrap" }}>
        <AppButton onPress={() => setSelectedCategory("food")} label="Food" themeColors={themeColors} />
        <AppButton onPress={() => setSelectedCategory("clothing")} label="Clothing" themeColors={themeColors} />
        <AppButton onPress={() => setSelectedCategory("furniture")} label="Furniture" themeColors={themeColors} />
        <AppButton onPress={() => setSelectedCategory("room")} label="Rooms" themeColors={themeColors} />
      </View>

      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
        {filteredItems.map(item => {
          const blocked = isBlocked(item);
          return (
            <View key={item.id} style={{ width: "30%", marginBottom: 10 }}>
              <AppButton
                onPress={() => buyItem(item.id)}
                label={blocked ? "SOLD" : `${item.name}\n${item.cost}`}
                disabled={blocked}
                themeColors={themeColors}
              />
            </View>
          );
        })}
      </View>
    </View>
  );
}