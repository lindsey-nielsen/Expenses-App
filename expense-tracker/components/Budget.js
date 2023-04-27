import { StyleSheet, Text, View } from 'react-native';
import { useCallback, useEffect, useState } from "react"
import { useFonts } from 'expo-font'
import { Input, Button } from "@rneui/themed"
import * as SplashScreen from 'expo-splash-screen'

SplashScreen.preventAutoHideAsync()

export default function BudgetScreen({ route, navigation }) {
    // variables
    let [disabled, setDisabled] = useState(true)
    let [amountError, setAmountError] = useState("")

    const params = route.params
    let newBudget = params.updatedBudget

    // load fonts success!!
    const [fontsLoaded] = useFonts({
        'Titles': require('../assets/fonts/Demo_ConeriaScript.ttf'),
        'Reg': require('../assets/fonts/GatsbyFLF.ttf'),
        'RegBold': require('../assets/fonts/GatsbyFLF-Bold.ttf'),
        'RegItalic': require('../assets/fonts/GatsbyFLF-Italic.ttf'),
        'RegBoldItalic': require('../assets/fonts/GatsbyFLF-BoldItalic.ttf')
    });

    
    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    // amount validation
    function validateAmount(value) {
        const moneyRegEx = /^(\d{1,3}(\,\d{3})*|(\d+))(\.\d{2})?$/
        const isValidAmount = value.match(moneyRegEx)

        if (!isValidAmount) {
            setAmountError("Error: Invalid amount.")
        } else {
            setAmountError("")
        }
    }

    function validate() {
        if (newBudget && !amountError) {
            setDisabled(false)
        }
        console.log(newBudget)
    }

    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            <Text style={{fontFamily: 'Titles', fontSize: '2em'}}>define your budget!</Text>
            <Input
                placeholder=" 0.00"
                onChangeText={budget => {
                    newBudget = budget
                    validateAmount(budget)
                    validate()
                }}
                inputStyle={{fontFamily: 'Titles'}}
            />
            <Text style={{fontFamily: 'RegBold'}}>{amountError}</Text>
            <Button 
                title="Set Budget"
                onPress={() => navigation.navigate("Home", {
                    updatedBudget: newBudget, 
                    enableButton: false
                })}
                titleStyle={{fontFamily: 'RegBold', fontSize:'1.5em'}}
                buttonStyle={{width: 150, backgroundColor: "#FEC6DF"}}
                disabled={disabled}
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    format: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        textAlign: 'right', 
        padding: 20
    },
});

