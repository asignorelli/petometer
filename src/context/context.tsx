import { createContext, useContext, useState } from "react";

//add types to prevent undefined error
type GameContextValue = {
  coinBal: number;
  foodInventory: Food[];
  addFood: (foodId: string, name: string, healthValue: number) => void;
  eatFood: (foodId: string) => number | null;
  addCoins: (amount: number) => void;
  resetCoinBalance: () => void;
  spendCoins: (amount: number) => boolean;
};

//define food type
type Food = {
  id: string;
  name: string;
  healthValue: number;
  quantity: number;
};

//create the gamecontext for my other tabs to use
const GameContext = createContext<GameContextValue | undefined>(undefined);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [coinBal, setCoinBal] = useState(0);
  const [foodInventory, setFoodInventory] = useState<Food[]>([]);

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

  const value = {
    coinBal,
    foodInventory,
    addCoins,
    resetCoinBalance,
    spendCoins,
    addFood,
    eatFood,
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

//
export function useGame() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error("useGame must be used inside a GameProvider");
  }
  return context;
}