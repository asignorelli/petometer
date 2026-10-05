import { useGame } from "@/context/context";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
//
//--------------  STEP COUNTER SCREEN ------------------------
//
export default function StepsScreen() {

  //VARIABLES ---------------------------

  //step logic
  const [steps, setSteps] = useState(0);
  const [stepGoal, setStepGoal] = useState(10000);
  const percentage = (steps/stepGoal)*100;

  //streak logic
  const [streakCount, updateStreak] = useState(0);

  //coin logic
  const [stepBank, setStepBank] = useState(0);
  const { coinBal, addCoins, resetCoinBalance } = useGame();

  //extra goals booleans
  const [hasDrankWater, setHasDrankWater] = useState(false);
  const [hasExercised, setHasExercised] = useState(false);
  const [hasSleptHours, setHasSleptHours] = useState(false);

  //FUNCTIONS---------------------

  //step logic functions
  function addSteps(){
    setSteps(steps + 500);
    setStepBank(stepBank + 500);

  }

   function resetSteps(){
    setSteps(0);
    setStepGoal(10000);
    setStepBank(0);
    updateStreak(0);
  }

  /*coin logic functions
  coins are calculated by steps in the bank divided by 1000
  this way, the total balance is only updated once the user collects their coins for the day 
  as opposed to constantly updated with the steps */
  function collectCoins(){
    const coinsEarned = Math.floor(stepBank/10);
    addCoins(coinsEarned);
    setStepBank(0);
  }

  function resetCoins(){
    resetCoinBalance();
    setStepBank(0);
    setHasDrankWater(false);
    setHasExercised(false);
    setHasSleptHours(false);
  }

  /*streak logic functions
  streak resets if goal not reached for the day
  streak can be increased/decreased by 500 */
  function updateStreakCount(){
    updateStreak(streakCount + 1);
  }

  function increaseGoal(){
    setStepGoal(Math.min(stepGoal + 500, 30000));
  }
  function decreaseGoal(){
    setStepGoal(Math.max(stepGoal - 500, 500));
  }

  //extra goals functions
  //can only gain 500 bonus once a day and cannot be unchecked once checked
  function drinkWater(){
    if(hasDrankWater==false){
        setHasDrankWater(true);
        addCoins(100);
    }
  }

  function exercise(){
    if(hasExercised==false){
        setHasExercised(true);
        addCoins(100);
    }
  }

  function sleep(){
    if(hasSleptHours==false){
        setHasSleptHours(true);
        addCoins(100);
    }
  }

  //RENDER ----------------------------
  return(
    <View>
      <Text> Steps: {steps}</Text>
      <Text> Step Goal: {stepGoal}</Text>
      <Text> Progress: {percentage.toFixed(2)}%</Text>
      <Text> Streak Count: {streakCount}</Text>
      <Text> Coin Balance: {coinBal}</Text>
      <Pressable onPress={addSteps}>
        <Text>Add 500 Steps</Text>
      </Pressable>
      <Pressable onPress={collectCoins}>
        <Text>Collect Coins</Text>
      </Pressable>
      <Pressable onPress={increaseGoal}>
        <Text>Increase Goal</Text>
      </Pressable>
      <Pressable onPress={decreaseGoal}>
        <Text>Decrease Goal</Text>
      </Pressable>
      <Pressable onPress={resetSteps}>
        <Text>Reset Steps</Text>
      </Pressable>
      <Pressable onPress={resetCoins}>
        <Text>Reset Coins</Text>
      </Pressable>
      <Pressable onPress={updateStreakCount}>
        <Text>Update Streak</Text>
      </Pressable>
      <Pressable onPress={drinkWater}>
        <Text>Drink Water</Text>
      </Pressable>
      <Pressable onPress={exercise}>
        <Text>Exercise</Text>
      </Pressable>
      <Pressable onPress={sleep}>
        <Text>Sleep</Text>
      </Pressable>
    </View>
  )
}
