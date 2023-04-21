import { StyleSheet, Text, View } from 'react-native';
import { useCallback, useEffect, useState } from "react"
import { useFonts } from 'expo-font'
import { Input, Button } from "@rneui/themed"
import * as SplashScreen from 'expo-splash-screen'
import { SelectList } from 'react-native-dropdown-select-list'

SplashScreen.preventAutoHideAsync()

export default function ExpenseScreen({ route, navigation }) {

    // variables
    let [amount, setAmount] = useState("")
    let [amountError, setAmountError] = useState("")
    let [selected, setSelected] = useState("")

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

    // params
    const params = route.params

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

    // categories
    let categoriesArr = params.infoArray.map(function (obj) {
        return obj.category
    })



    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            <View style={styles.format}>
                <Text style={{fontFamily: 'Titles'}}>Amount</Text>
                <Input 
                    placeholder=" 0.00"
                    onChangeText={amount => {
                        setAmount(amount)
                        validateAmount(amount)
                    }}
                    inputStyle={{fontFamily: "Titles"}}     
                />
                <Text style={{fontFamily: 'RegBold'}}>{amountError}</Text>
            </View>
            <View>
                <Text style={{fontFamily: 'Titles'}}>Category</Text>
                <SelectList 
                    setSelected={(val) => setSelected(val)}
                    data={categoriesArr}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    format: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        textAlign: 'right'
    },
});
