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
  spendCoins: (amount: number) => boolean;
  buyHat: (id: string, name: string, moodBoost: number) => void;
  equipHat: (id: string) => void;
  hats: Clothing[];
  furnitureOwned: Furniture[];
  buyFurniture: (id: string, name: string, category: string, moodBoost: number) => void;
  placeFurniture: (id: string) => void;
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
  equipped:boolean;
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

//create the gamecontext for my other tabs to use
//based off of: https://www.geeksforgeeks.org/react-native/creating-context-in-react-native/
const GameContext = createContext<GameContextValue | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [coinBal, setCoinBal] = useState(0);
  const [foodInventory, setFoodInventory] = useState<Food[]>([]);
  const [hats, setHats] = useState<Clothing[]>([]);
  const [furnitureOwned, setFurnitureOwned] = useState<Furniture[]>([]);

  function addCoins(amount: number) {
    setCoinBal(prev => prev + amount);
  }
  function resetCoinBalance() {
    setCoinBal(0);
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
    const newInventory = [...foodInventory];
    let found = false;
    for (let i = 0; i < newInventory.length; i++) {
      if (newInventory[i].id === foodId) {
        newInventory[i].quantity += 1;
        found = true;
        break;
      }
    }
    if (!found) {
      newInventory.push({ id: foodId, name, healthValue, quantity: 1 });
    }
    setFoodInventory(newInventory);
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
  function buyHat(id: string, name: string, moodBoost: number) {
    const newHats = [...hats];
    let found = false;
    for (let i = 0; i < newHats.length; i++) {
      if (newHats[i].id === id) {
        newHats[i].owned = true;
        found = true;
        break;
      }
    }
    if (!found) {
      newHats.push({ id, name, owned: true, equipped: false, moodBoost });
    }
    setHats(newHats);
  }

  //ensures only one hat can be equipped at a time, and handles unequip
  function equipHat(id: string) {
  const newHats = [...hats];
  for (let i = 0; i < newHats.length; i++) {
    if (newHats[i].id === id) {
      const wasEquipped = newHats[i].equipped;
      newHats[i].equipped = !wasEquipped;
    } else {
      newHats[i].equipped = false; //ALWAYS UNEQUIP WHATEVER ELSE IS ON
    }
  }
  setHats(newHats);
}

//FURNITURE LOGIC ---------------------
//adds furniture to the inventory
function buyFurniture(id: string, name: string, category: string, moodBoost: number) {
  setFurnitureOwned(prev => {
    const newFurniture = [...prev];
    let found = false;
    for (let i = 0; i < newFurniture.length; i++) {
      if (newFurniture[i].id === id) {
        newFurniture[i].owned = true;
        found = true;
        break;
      }
    }
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
  for (let i = 0; i < newFurniture.length; i++) {
    if (newFurniture[i].id === id) {
      targetCategory = newFurniture[i].category;
      placed = newFurniture[i].placed;
    }
  }
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

  //context value that will be provided to the rest of the app
  const value = {
    coinBal,
    foodInventory,
    addCoins,
    resetCoinBalance,
    spendCoins,
    addFood,
    eatFood,
    buyHat,
    equipHat,
    hats,
    furnitureOwned,
    buyFurniture,
    placeFurniture,
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