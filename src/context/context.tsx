import { createContext, useContext, useState } from "react";

//THIS FILE AND LOGIC REFERENCES THIS ARTICLE: https://www.geeksforgeeks.org/react-native/creating-context-in-react-native/
//and also react native documentation

//this files purpose is to allow different parts of the app to access/change
//the game's state (coins, food inventory, hats) through a centralized context.

//
// ---------------- GAME CONTEXT ----------------------
//

//add types to prevent undefined error
type GameContextValue = {
  coinBal: number;
  foodInventory: Food[];
  addFood: (foodId: string, name: string, healthValue: number) => void;
  eatFood: (foodId: string) => number | null;
  addCoins: (amount: number) => void;
  resetCoinBalance: () => void;
  resetInventory: () => void;
  spendCoins: (amount: number) => boolean;
  buyClothing: (id: string, name: string, moodBoost: number) => void;
  equipClothing: (id: string) => void;
  clothing: Clothing[];
  furnitureOwned: Furniture[];
  buyFurniture: (id: string, name: string, category: string, moodBoost: number) => void;
  placeFurniture: (id: string) => void;
  rooms: Room[];
  buyRoom: (id: string, name: string) => void;
  equipRoom: (id: string) => void;
};

//define food type
type Food = {
  id: string;
  name: string;
  healthValue: number;
  quantity: number;
};

//define clothing (aka just hats) type
type Clothing = {
  id: string;
  name: string;
  owned: boolean;
  equipped: boolean;
  moodBoost: number;
};

//define furniture types
type Furniture = {
  id: string;
  name: string;
  category: string; //(ex: wall, floor, painting, chair)
  moodBoost: number;
  owned: boolean;
  placed: boolean;
};

type Room ={
  id: string;
  name: string;
  owned: boolean;
  equipped: boolean;
};

//create the gamecontext for my other tabs to use
//based off of: https://www.geeksforgeeks.org/react-native/creating-context-in-react-native/
const GameContext = createContext<GameContextValue | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [coinBal, setCoinBal] = useState(0);
  const [foodInventory, setFoodInventory] = useState<Food[]>([]);
  const [clothing, setClothing] = useState<Clothing[]>([]);
  const [furnitureOwned, setFurnitureOwned] = useState<Furniture[]>([]);

  //reset functions for demo
  function resetCoinBalance() {
    setCoinBal(0);
  }
  function resetInventory() {
    setFoodInventory([]);
    setClothing([]);
    setFurnitureOwned([]);
    setRooms([]);
  }

  //coin functions
  function addCoins(amount: number) {
    setCoinBal(prev => prev + amount);
  }
  function spendCoins(amount: number) {
    // 1. check: is coinBal >= amount?
    // 2. if yes: setCoinBal to coinBal - amount, return true
    // 3. if no: return false (caller knows purchase failed)
    if (coinBal >= amount) {
      setCoinBal(prev => prev - amount);
      return true;
    }
    else {
      return false;
    }
  }

  //FOOD AND EATING LOGIC -----------------
  function addFood(foodId: string, name: string, healthValue: number) {
    // 1. make a copy of foodInventory (const newInventory = [...foodInventory])
    // 2. loop through newInventory with a for loop
    // 3. if you find an item where item.id === foodId, increase its quantity by 1, set found = true
    // 4. after the loop, if not found, push a new {id, name, healthValue, quantity: 1} onto newInventory
    // 5. call setFoodInventory(newInventory)
    setFoodInventory(prev => {
      const newInventory = [...prev];
      let found = false;

      //check if the food item already exists in the inventory
      //if yes, add to quantity
      for (let i = 0; i < newInventory.length; i++) {
        if (newInventory[i].id === foodId) {
          newInventory[i].quantity += 1;
          found = true;
          break;
        }
      }
      //otherwise, make new food in inventory
      if (!found) {
        newInventory.push({ id: foodId, name, healthValue, quantity: 1 });
      }
      return (newInventory);
    });
  }

  //eats the food based off the id, return health value if there is one
  function eatFood(foodId: string) {

    const newInventory = [...foodInventory];
    for (let i = 0; i < newInventory.length; i++) {
      if (newInventory[i].id === foodId) {
        if (newInventory[i].quantity === 0) {
          return null;
        }
        newInventory[i].quantity -= 1;
        setFoodInventory(newInventory);
        return newInventory[i].healthValue;
      }
    }
    return null;
  }

  //CLOTHING LOGIC ---------------------
  //handles buying and equipping hats for the pet
  function buyClothing(id: string, name: string, moodBoost: number) {
    setClothing(prev => {
      const newClothing = [...prev];
    let found = false;

    //check if hat is owned
    for (let i = 0; i < newClothing.length; i++) {
      if (newClothing[i].id === id) {
        newClothing[i].owned = true;
        found = true;
        break;
      }
    }
    //if not found, add new clothing item
    if (!found) {
      newClothing.push({ id, name, owned: true, equipped: false, moodBoost });
    }
      return newClothing;
    });
  }

  //ensures only one hat can be equipped at a time, and handles unequip
  function equipClothing(id: string) {
    setClothing(prev=> {
    const newClothing = [...prev];

    //loop through clothing to equip/unequip the selected item
    for (let i = 0; i < newClothing.length; i++) {
      if (newClothing[i].id === id) {
        const wasEquipped = newClothing[i].equipped;
        newClothing[i].equipped = !wasEquipped;
      }
      else {
        newClothing[i].equipped = false; //ALWAYS UNEQUIP WHATEVER ELSE IS ON
      }
    }
    return newClothing;
  });
  }

  //FURNITURE LOGIC ---------------------
  //adds furniture to the inventory
  function buyFurniture(id: string, name: string, category: string, moodBoost: number) {
    setFurnitureOwned(prev => {
      const newFurniture = [...prev];
      let found = false;

      //check if furniture is owned
      for (let i = 0; i < newFurniture.length; i++) {
        if (newFurniture[i].id === id) {
          newFurniture[i].owned = true;
          found = true;
          break;
        }
      }
      //if not found, add new furniture
      if (!found) {
        newFurniture.push({ id, name, category, moodBoost, owned: true, placed: false });
      }
      return newFurniture;
    });
  }

  //places furniture
  //ensures that only one furniture of each category can be used at once
  //example, u can use the blue wall and blue chair at the same time, but not green wall and blue wall
  function placeFurniture(id: string) {
    const newFurniture = [...furnitureOwned];

    //find the category of the furniture being placed
    let targetCategory = "";
    let placed = false;

    //find the furniture item being placed and get its category and current placed status
    for (let i = 0; i < newFurniture.length; i++) {
      if (newFurniture[i].id === id) {
        targetCategory = newFurniture[i].category;
        placed = newFurniture[i].placed;
      }
    }
    //loop through furniture to unequip same category and place the selected one
    for (let i = 0; i < newFurniture.length; i++) {

      //unequip furniture of same type
      if (newFurniture[i].category === targetCategory) {
        newFurniture[i].placed = false;
      }
      //and place it
      if (newFurniture[i].id === id && !placed) {
        newFurniture[i].placed = true;
      }
    }
    setFurnitureOwned(newFurniture);
  }

  //ROOM LOGIC ---------------------
  //define the default room you start with
  const [rooms, setRooms] = useState<Room[]>([
    {id: "gray", name: "Gray Room", owned:true, equipped: true}
  ]);

  function buyRoom(id: string, name: string) {
    setRooms(prev => {
      const newRooms = [...prev];
      let found = false;

      //check if room is owned
      for (let i = 0; i < newRooms.length; i++) {
        if (newRooms[i].id === id) {
          newRooms[i].owned = true;
          found = true;
          break;
        }
      }
      //if not found, add new room
      if (!found) {
        newRooms.push({ id, name, owned: true, equipped: false });
      }
      return newRooms;
    });
  }

  //equip the new room
  function equipRoom(id: string) {
    setRooms(prev => {
      const newRooms = [...prev];
      for (let i = 0; i < newRooms.length; i++) {
        if (newRooms[i].id === id) {
          newRooms[i].equipped = true;
        } else {
          newRooms[i].equipped = false;
        }
      }
      return newRooms;
    });
  }

  //context value that will be provided to the rest of the app
  const value = {
    coinBal,
    foodInventory,
    addCoins,
    resetCoinBalance,
    resetInventory,
    spendCoins,
    addFood,
    eatFood,
    buyClothing,
    equipClothing,
    clothing,
    furnitureOwned,
    buyFurniture,
    placeFurniture,
    rooms,
    buyRoom,
    equipRoom,
  };

  //provides the context to the rest of the app
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

//my custom hook to use the game context with error handling!!!
export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used inside a GameProvider");
  }
  return context;
}