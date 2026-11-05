import CoinDisplay from "@/components/CoinDisplay";
import ShopItemCard from "@/components/ShopItemCard";
import { sharedStyles } from "@/constants/sharedStyles";
import { useGame } from "@/context/context";
import { darkenColor } from "@/utils/colorHelpers";
import { getThemeColors } from "@/utils/getThemeColors";
import { useState } from "react";
import { Dimensions, Pressable, Text, View } from "react-native";

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
  icon?: any;
};

type ClothingItem = {
  id: string;
  name: string;
  type: "clothing";
  cost: number;
  moodBoost: number;
  icon?: any;
};

type FurnitureItem = {
  id: string;
  name: string;
  type: "furniture";
  cost: number;
  category: string;
  moodBoost: number;
  icon?: any;
};

type RoomItem = {
  id: string;
  name: string;
  type: "room";
  cost: number;
  icon?: any;
}

type ShopItem = FoodItem | ClothingItem | FurnitureItem | RoomItem;

export default function MarketplaceScreen() {

  //VARIABLES----------------------
  const { spendCoins, addFood, buyClothing, buyFurniture, buyRoom,
    coinBal, clothing, furnitureOwned, foodInventory, rooms } = useGame();
  const themeColors = getThemeColors(rooms);

  const screenWidth = Dimensions.get("window").width;
  const panelPadding = 16; // matches your panel's padding
  const cardGap = 8; // total gap per card (4 margin each side, or similar)
  const cardWidth = (screenWidth - panelPadding * 2 - cardGap * 3) / 3;
  const cardHeight = cardWidth * 1.3; // taller than wide, adjust ratio to taste

  const shopItems: ShopItem[] = [
    //clothes
    { id: "ribbon_red", name: "Red Bow", type: "clothing", cost: 80, moodBoost: 8, icon: require('@/assets/images/clothing/redbow.png') },
    { id: "ribbon_yellow", name: "Yellow Bow", type: "clothing", cost: 80, moodBoost: 8, icon: require('@/assets/images/clothing/yellowbow.png') },
    { id: "ribbon_green", name: "Green Bow", type: "clothing", cost: 80, moodBoost: 8, icon: require('@/assets/images/clothing/greenbow.png') },
    { id: "ribbon_blue", name: "Blue Bow", type: "clothing", cost: 80, moodBoost: 8, icon: require('@/assets/images/clothing/bluebow.png') },
    { id: "ribbon_purple", name: "Purple Bow", type: "clothing", cost: 80, moodBoost: 8, icon: require('@/assets/images/clothing/purplebow.png') },
    { id: "ribbon_pink", name: "Pink Bow", type: "clothing", cost: 80, moodBoost: 8, icon: require('@/assets/images/clothing/pinkbow.png') },
    { id: "ribbon_white", name: "White Bow", type: "clothing", cost: 80, moodBoost: 8, icon: require('@/assets/images/clothing/whitebow.png') },
    { id: "ribbon_brown", name: "Brown Bow", type: "clothing", cost: 80, moodBoost: 8, icon: require('@/assets/images/clothing/brownbow.png') },
   
    //food
    { id: "salmon", name: "Salmon", type: "food", cost: 50, healthValue: 25, icon: require('@/assets/images/food/salmon.png') },
    { id: "chicken", name: "Chicken", type: "food", cost: 40, healthValue: 20, icon: require('@/assets/images/food/chicken.png') },
    { id: "tuna", name: "Tuna", type: "food", cost: 45, healthValue: 22, icon: require('@/assets/images/food/tuna.png') },
    { id: "pumpkin", name: "Pumpkin", type: "food", cost: 25, healthValue: 12, icon: require('@/assets/images/food/pumpkin.png') },
    { id: "egg", name: "Egg", type: "food", cost: 30, healthValue: 15, icon: require('@/assets/images/food/egg.png') },
    { id: "carrot", name: "Carrot", type: "food", cost: 20, healthValue: 10, icon: require('@/assets/images/food/carrot.png') },
    { id: "sardines", name: "Sardines", type: "food", cost: 35, healthValue: 18, icon: require('@/assets/images/food/sardines.png') },
    { id: "shrimp", name: "Shrimp", type: "food", cost: 35, healthValue: 17, icon: require('@/assets/images/food/shrimp.png') },
    { id: "sweet_potato", name: "Sweet Potato", type: "food", cost: 28, healthValue: 14, icon: require('@/assets/images/food/sweetpotato.png') },

    //furniture
    { id: "catbed", name: "Cat Bed", type: "furniture", category: "catbed", cost: 120, moodBoost: 12, icon: require('@/assets/images/furniture/catbed.png') },
    { id: "cathouse", name: "Cat House", type: "furniture", category: "cathouse", cost: 200, moodBoost: 18, icon: require('@/assets/images/furniture/cathouse.png') },
    { id: "cattree", name: "Cat Tree", type: "furniture", category: "cattree", cost: 220, moodBoost: 20, icon: require('@/assets/images/furniture/cattree.png') },
    { id: "lamp", name: "Lamp", type: "furniture", category: "lamp", cost: 60, moodBoost: 6, icon: require('@/assets/images/furniture/lamp.png') },
    { id: "mousetoy", name: "Mouse Toy", type: "furniture", category: "mousetoy", cost: 40, moodBoost: 5, icon: require('@/assets/images/furniture/mousetoy.png') },
    { id: "painting", name: "Painting", type: "furniture", category: "painting", cost: 90, moodBoost: 9, icon: require('@/assets/images/furniture/painting.png') },
    { id: "plant", name: "Plant", type: "furniture", category: "plant", cost: 70, moodBoost: 7, icon: require('@/assets/images/furniture/plant.png') },
    { id: "scratchpost", name: "Scratch Post", type: "furniture", category: "scratchpost", cost: 110, moodBoost: 11, icon: require('@/assets/images/furniture/scratchpost.png') },
    { id: "window", name: "Window", type: "furniture", category: "window", cost: 80, moodBoost: 8, icon: require('@/assets/images/furniture/window.png') },
    //rooms
{ id: "coral", name: "Coral Room", type: "room", cost: 200, icon: require('@/assets/images/rooms/coralRoom.png') },
{ id: "tan", name: "Tan Room", type: "room", cost: 200, icon: require('@/assets/images/rooms/tanRoom.png') },
{ id: "darkTan", name: "Dark Tan Room", type: "room", cost: 200, icon: require('@/assets/images/rooms/darkTanRoom.png') },
{ id: "jungle", name: "Jungle Room", type: "room", cost: 200, icon: require('@/assets/images/rooms/jungleRoom.png') },
{ id: "blue", name: "Blue Room", type: "room", cost: 200, icon: require('@/assets/images/rooms/blueRoom.png') },
{ id: "navy", name: "Navy Room", type: "room", cost: 200, icon: require('@/assets/images/rooms/navyRoom.png') },
{ id: "purple", name: "Purple Room", type: "room", cost: 200, icon: require('@/assets/images/rooms/purpleRoom.png') },
{ id: "pink", name: "Pink Room", type: "room", cost: 200, icon: require('@/assets/images/rooms/pinkRoom.png') },
{ id: "black", name: "Black Room", type: "room", cost: 200, icon: require('@/assets/images/rooms/blackRoom.png') },
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

      <View
        style={{
          flex: 1,
          backgroundColor: themeColors.primary,
          borderRadius: 16,
          overflow: "hidden",
          marginTop: 10,
        }}
      >
        {/* tabs, flush at top, no borders */}
        <View style={{ flexDirection: "row" }}>
          {(["food", "clothing", "furniture", "room"] as const).map((cat, index) => (
            <Pressable
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              style={{
                flex: 1,
                paddingVertical: 10,
                backgroundColor:
                  selectedCategory === cat
                    ? themeColors.primary
                    : darkenColor(themeColors.primary, 50 + index * 15),
              }}
            >
              <Text style={{ color: "white", textAlign: "center", fontSize: 20, fontFamily: "Ithaca" }}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* grid content, padded, pushed below tabs */}
        <View style={{ flex: 1, padding: 16 }}>
          <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", top: 30 }}>
            {filteredItems.map(item => {
              const blocked = isBlocked(item);
              return (
                <View key={item.id} style={{ width: "33.3%", padding: 4 }}>
                  <ShopItemCard
                    name={item.name}
                    cost={item.cost}
                    icon={item.icon}
                    iconSize={item.type === "food" || item.type === "clothing" ? 65 : 100}
                    disabled={blocked}
                    onPress={() => buyItem(item.id)}
                    themeColors={themeColors}
                  />
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
}