import { useState } from "react";
import { Pressable, Text, View } from "react-native";

export default function StepsScreen() {
  const [steps, setSteps] = useState(0);

  function addSteps(){
    setSteps(steps + 500);
  }
  return(
    <View>
      <Text> Steps: {steps}</Text>
      <Pressable onPress={addSteps}>
        <Text>Add 500 Steps</Text>
      </Pressable>
    </View>
  )
}
