import AppButton from "@/components/AppButton";
import CoinDisplay from "@/components/CoinDisplay";
import GoalRow from "@/components/GoalRow";
import { sharedStyles } from "@/constants/sharedStyles";
import { useGame } from "@/context/context";
import { darkenColor } from "@/utils/colorHelpers";
import { getThemeColors } from "@/utils/getThemeColors";
import { useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
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
  const { coinBal, addCoins, resetCoinBalance, rooms } = useGame();
  const themeColors = getThemeColors(rooms);
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
    if (bonusClaimed) {
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
    const newSteps = steps + 5000;
    goalReached(newSteps, stepGoal, steps, stepGoal);
    setSteps(newSteps);
    setStepBank(prevBank => prevBank + 5000);
  }

  function resetSteps() {
    setSteps(0);
    setStepGoal(10000);
    setStepBank(0);
    updateStreak(0);
    resetCoinBalance();
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
    <View style={{ flex: 1 }}>
      <ScrollView style={[sharedStyles.container, { backgroundColor: themeColors.background }]}>
        <View style={sharedStyles.topRow}>
          <View style={{ width: 60 }} />
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", marginLeft: 30 }}>
            <Image source={require('@/assets/images/icons/fire.png')} style={{ width: 21, height: 21, marginRight: 5 }} />
            <Text style={{ color: themeColors.text, fontFamily: "Pixgamer", fontSize: 26 }}>{streakCount}</Text>
          </View>
          <CoinDisplay amount={coinBal} themeColors={themeColors} />
        </View>

        <Text style={[sharedStyles.bigNumber, { color: themeColors.text, fontSize: 130 }]}>{steps}</Text>

        <View style={{ width: "90%", height: 30, alignSelf: "center", backgroundColor: "white", overflow: "hidden", marginVertical: 12, borderColor: "black", borderWidth: 2 }}>
          <View style={{ width: `${Math.min(percentage, 100)}%`, height: "100%", backgroundColor: themeColors.primary }} />
        </View>

        <Text style={{ textAlign: "center", color: themeColors.text, fontFamily: "Pixgamer", fontSize: 22, marginBottom: 18 }}>
          /{stepGoal}
        </Text>

        <Pressable onPress={collectCoins} style={{ backgroundColor: themeColors.primary, borderRadius: 12, padding: 20, alignItems: "center", marginBottom: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "white", borderRadius: 10, paddingVertical: 8, paddingHorizontal: 16, marginBottom: 12 }}>
            <Image source={require('@/assets/images/icons/coin.png')} style={{ width: 28, height: 28, marginRight: 8 }} />
            <Text style={{ color: "#2C2C2C", fontFamily: "Ithaca", fontSize: 30 }}>{stepBank / 10}</Text>
          </View>

          <View style={{ backgroundColor: "white", borderRadius: 10, paddingVertical: 8, paddingHorizontal: 20 }}>
            <Text style={{ color: "#2C2C2C", fontFamily: "Pixgamer", fontSize: 30, fontWeight: "600" }}>Collect Coins</Text>
          </View>
        </Pressable>

        <Text style={{ textAlign: "center", color: themeColors.text, fontFamily: "Ithaca", fontSize: 35 }}>
          Daily Goals
        </Text>

        <View style={{ backgroundColor: hasDrankWater ? darkenColor(themeColors.primary) : themeColors.primary, borderRadius: 10, marginBottom: 10, marginTop: 10 }}>
          <GoalRow label="Drink 10 Glasses of Water" done={hasDrankWater} onPress={drinkWater} themeColors={themeColors} />
        </View>
        <View style={{ backgroundColor: hasExercised ? darkenColor(themeColors.primary) : themeColors.primary, borderRadius: 10, marginBottom: 10 }}>
          <GoalRow label="Exercise for 30 Minutes" done={hasExercised} onPress={exercise} themeColors={themeColors} />
        </View>
        <View style={{ backgroundColor: hasSleptHours ? darkenColor(themeColors.primary) : themeColors.primary, borderRadius: 10, marginBottom: 10 }}>
          <GoalRow label="Sleep 8 Hours" done={hasSleptHours} onPress={sleep} themeColors={themeColors} />
        </View>

        <Text style={{ textAlign: "center", color: themeColors.text, fontFamily: "Ithaca", fontSize: 35, marginTop: 24, marginBottom: 10 }}>
          Change Step Goal
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", backgroundColor: themeColors.background, paddingVertical: 16, marginBottom: 40 }}>
          <Pressable onPress={decreaseGoal} style={{ width: 68, height: 68, backgroundColor: themeColors.primary, justifyContent: "center", alignItems: "center", marginRight: 24 }}>
            <Text style={{ color: "white", fontSize: 48, fontFamily: "Pixgamer" }}>−</Text>
          </Pressable>

          <Text style={{ color: themeColors.text, fontFamily: "Pixgamer", fontSize: 48, paddingLeft: 10, paddingRight: 10 }}>{stepGoal}</Text>

          <Pressable onPress={increaseGoal} style={{ width: 68, height: 68, backgroundColor: themeColors.primary, justifyContent: "center", alignItems: "center", marginLeft: 24 }}>
            <Text style={{ color: "white", fontSize: 48, fontFamily: "Pixgamer" }}>+</Text>
          </Pressable>
        </View>
      </ScrollView>

      <View style={{ position: "absolute", bottom: 10, right: 10 }}>
        <AppButton onPress={addSteps} label="Add 500 Steps" themeColors={themeColors} small transparent />
        <AppButton onPress={resetSteps} label="Reset" themeColors={themeColors} small transparent />
        <AppButton onPress={simulateDay} label="New Day" themeColors={themeColors} small transparent />
      </View>
    </View>
  );
}   