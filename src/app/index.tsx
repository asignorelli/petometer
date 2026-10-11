import { useGame } from "@/context/context";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
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
    return (
      <View>
        <Text style={styles.paragraph}> Steps: {steps}</Text>
        <Text style={styles.paragraph}> Step Goal: {stepGoal}</Text>
        <Text style={styles.paragraph}> Progress: {percentage.toFixed(2)}%</Text>
        <Text style={styles.paragraph}> Streak Count: {streakCount}</Text>
        <Text style={styles.paragraph}> Coin Balance: {coinBal}</Text>
        <Pressable onPress={addSteps}>
          <Text style={styles.paragraph}>Add 500 Steps</Text>
        </Pressable>
        <Pressable onPress={collectCoins}>
          <Text style={styles.paragraph}>Collect Coins</Text>
        </Pressable>
        <Pressable onPress={increaseGoal}>
          <Text style={styles.paragraph}>Increase Goal</Text>
        </Pressable>
        <Pressable onPress={decreaseGoal}>
          <Text style={styles.paragraph}>Decrease Goal</Text>
        </Pressable>
        <Pressable onPress={resetSteps}>
          <Text style={styles.paragraph}>Reset Steps</Text>
        </Pressable>
        <Pressable onPress={resetCoins}>
          <Text style={styles.paragraph}>Reset Coins</Text>
        </Pressable>
        <Pressable onPress={updateStreakCount}>
          <Text style={styles.paragraph}>Update Streak</Text>
        </Pressable>
        <Pressable onPress={drinkWater}>
          <Text style={styles.paragraph}>Drink Water</Text>
        </Pressable>
        <Pressable onPress={exercise}>
          <Text style={styles.paragraph}>Exercise</Text>
        </Pressable>
        <Pressable onPress={sleep}>
          <Text style={styles.paragraph}>Sleep</Text>
        </Pressable>
        <Pressable onPress={simulateDay}>
          <Text style={styles.paragraph}>Simulate Day</Text>
        </Pressable>
      </View>
    )
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
      padding: 8,
    },
    paragraph: {
      margin: 10,
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
