import AppButton from "@/components/AppButton";
import CoinDisplay from "@/components/CoinDisplay";
import { sharedStyles } from "@/constants/sharedStyles";
import { useGame } from "@/context/context";
import { useState } from "react";
import { Text, View } from "react-native";
//
//--------------  STEP COUNTER SCREEN ------------------------
//
export default function StepsScreen() {

  //VARIABLES ---------------------------

  //step logic
  const [steps, setSteps] = useState(0);
  const [stepGoal, setStepGoal] = useState(10000);
  const percentage = (steps / stepGoal) * 100;

  //streak logic
  const [streakCount, updateStreak] = useState(0);
  const [bonusClaimed, setBonusClaimed] = useState(false);

  //coin logic
  const [stepBank, setStepBank] = useState(0);
  const { coinBal, addCoins, resetCoinBalance } = useGame();

  //extra goals booleans
  const [hasDrankWater, setHasDrankWater] = useState(false);
  const [hasExercised, setHasExercised] = useState(false);
  const [hasSleptHours, setHasSleptHours] = useState(false);

  //FUNCTIONS---------------------

  //step logic functions
  //this checks if goal has been reached for the day
  //also prevents the goal reward being done multiple times in a day! (due to decreasing/increasing goals)
  function goalReached(currSteps: number, currGoal: number, prevSteps: number, prevGoal: number) {
    //if bonus claimed, break
    if(bonusClaimed){
      return;
    }
    const overBefore = prevSteps >= prevGoal;
    const overNow = currSteps >= currGoal;
    if (!overBefore && overNow) {
      updateStreak(prevStreak => prevStreak + 1);
      setStepBank(prevBank => prevBank + 1000);
      setBonusClaimed(true);
    }
  }
  //add steps and check if you reached the goal
    function addSteps() {
      const newSteps = steps + 500; 
      goalReached(newSteps, stepGoal, steps, stepGoal);
      setSteps(newSteps);
      setStepBank(prevBank => prevBank + 500);

    }

    function resetSteps() {
      setSteps(0);
      setStepGoal(10000);
      setStepBank(0);
      updateStreak(0);
    }

    /*coin logic functions
    coins are calculated by steps in the bank divided by 1000
    this way, the total balance is only updated once the user collects their coins for the day 
    as opposed to constantly updated with the steps */
    function collectCoins() {
      const coinsEarned = Math.floor(stepBank / 10);
      addCoins(coinsEarned);
      setStepBank(0);
    }

    function resetCoins() {
      resetCoinBalance();
      setStepBank(0);
      setHasDrankWater(false);
      setHasExercised(false);
      setHasSleptHours(false);
    }

    /*streak logic functions
    streak resets if goal not reached for the day */
    function updateStreakCount() {
      updateStreak(streakCount + 1);
    }
    function increaseGoal() {
      setStepGoal(Math.min(stepGoal + 500, 30000));
    }
    function decreaseGoal() {
      setStepGoal(Math.max(stepGoal - 500, 500));
    }

    //extra goals functions
    //can only gain 500 bonus once a day and cannot be unchecked once checked
    function drinkWater() {
      if (hasDrankWater == false) {
        setHasDrankWater(true);
        addCoins(100);
      }
    }
    function exercise() {
      if (hasExercised == false) {
        setHasExercised(true);
        addCoins(100);
      }
    }
    function sleep() {
      if (hasSleptHours == false) {
        setHasSleptHours(true);
        addCoins(100);
      }
    }

    //demo function to do the next day
    function simulateDay() {

      //reset streak if missed a day
      if (steps < stepGoal) {
        updateStreak(0);
      }
      setSteps(0);
      setHasDrankWater(false);
      setHasExercised(false);
      setHasSleptHours(false);
      setBonusClaimed(false);
    }

    //RENDER ----------------------------
    //new and improved temp style sheet that will change when I find assets
    //basically just for the demo so its not an ugly list of text
    return (
      <View style={sharedStyles.container}>
      <View style={sharedStyles.topRow}>
        <View style={{ flex: 1 }} />
        <Text>Streak: {streakCount}</Text>
        <CoinDisplay amount={coinBal} />
      </View>

      <Text style={sharedStyles.bigNumber}>{steps}</Text>
      <Text style={sharedStyles.subText}>{percentage.toFixed(0)}% of {stepGoal}</Text>
      
        <Text style={sharedStyles.cardLabel}>Bank: {stepBank/10}</Text>
        <AppButton onPress={collectCoins} label="Collect Coins" />

        <Text style={sharedStyles.cardLabel}>Daily Goals</Text>
        <AppButton onPress={drinkWater} label={hasDrankWater ? "DONE" : "Drink Water"} />
        <AppButton onPress={exercise} label={hasExercised ? "DONE" : "Exercise"} />
        <AppButton onPress={sleep} label={hasSleptHours ? "DONE" : "Sleep"} />
     
        <Text style={sharedStyles.cardLabel}>Step Goal</Text>
        <AppButton onPress={increaseGoal} label="Increase Goal" />
        <AppButton onPress={decreaseGoal} label="Decrease Goal" />
  
      <View style={sharedStyles.demoCorner}>
        <AppButton onPress={addSteps} label="Add 500 Steps" />
        <AppButton onPress={resetSteps} label="Reset" />
        <AppButton onPress={simulateDay} label="New Day" />
      </View>
    </View>
  );
}
