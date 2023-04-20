import { StyleSheet, Text, View } from 'react-native';
import { useCallback, useEffect, useState } from "react"
import { useFonts } from 'expo-font'
import { Input, Button } from "@rneui/themed"

export default function BudgetScreen({ navigation }) {

    // budget
    let [budget, setBudget] = useState(0)

    return (
        <View>
            <Input
                placeholder="Input Budget"
                onChangeText={budget => setBudget(budget)}
            />
            <Button 
                title="Home"
                onPress={() => navigation.navigate("Home", {
                    updatedBudget: budget
            })}/>
        </View>
    )

}
