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
    let [category, setCategory] = useState("")
    let [date, setDate] = useState("")
    let [dateError, setDateError] = useState("")
    let [note, setNote] = useState("")
    let [disabled, setDisabled] = useState(true)
    let [submitText, setSubmitText] = useState("")

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

    // date validation
    function validateDate(value) {
        const dateRegEx = /^((0|1)\d{1})-((0|1|2)\d{1})-((19|20)\d{2})/
        const isValidDate = value.match(dateRegEx)

        if (!isValidDate) {
            setDateError("Error: Invalid date.")
        } else {
            setDateError("")
        }
    }

    function submit() {
        setSubmitText("Expense Submitted!")
        let newExpense = {
            amount: amount,
            date: date,
            note: note
        }

        const findCategoryInArray = params.infoArray.find(arr => {
            if (arr.category === category) {
                return true
            }
            return false
        })
        let index = params.infoArray.indexOf(findCategoryInArray)
        params.infoArray[index].push(newExpense)
    }

    function validate() {
        // validate error fields not working try later
        let allFieldsExist = amount && date && category
        if (allFieldsExist) {
            setDisabled(false)
        } else {
            setDisabled(true)
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
                        validate()
                    }}
                    inputStyle={{fontFamily: "Titles"}}     
                />
                <Text style={{fontFamily: 'RegBold'}}>{amountError}</Text>
            </View>
            <View style={styles.format}>
                <Text style={{fontFamily: 'Titles'}}>Category </Text>
                <SelectList 
                    setSelected={(val) => setCategory(val)}
                    data={categoriesArr}
                    fontFamily='RegBold'
                    onSelect={(val) => { 
                        validate()
  

                    }}
                />
            </View>
            <View style={styles.format}>
                <Text style={{fontFamily: 'Titles'}}>Date </Text>
                <Input 
                    placeholder=" XX-XX-XXXX"
                    onChangeText={date => {
                        setDate(date)
                        validateDate(date)
                        validate()
                    }}
                    inputStyle={{fontFamily: "Titles"}} 
                />
                <Text style={{fontFamily: 'RegBold'}}>{dateError}</Text>
            </View>
            <View style={styles.format}>
                <Text style={{fontFamily: 'Titles'}}>Notes </Text>
                <Input 
                    placeholder=" Optional"
                    onChangeText={note => setNote(note)}
                    inputStyle={{fontFamily: 'RegBold'}}
                />
            </View>
            <Text style={{fontFamily: 'RegBold'}}>{submitText}</Text>
            <Button 
                title="Submit"
                disabled={disabled}
                onPress={() => submit()}
                titleStyle={{fontFamily: 'Titles', fontSize:'1.5em'}}
                buttonStyle={{width: 150, backgroundColor: "#FEC6DF"}}
            />
           
            <Button
                title="Home"
                onPress={() => navigation.navigate("Home", {
                    infoArray: params.infoArray
                })}
                titleStyle={{fontFamily: 'Titles', fontSize:'1.5em'}}
                buttonStyle={{width: 150, backgroundColor: "#FEC6DF"}}
            />
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
