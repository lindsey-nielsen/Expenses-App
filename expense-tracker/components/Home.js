import { useCallback, useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Input, Button } from "@rneui/themed"

SplashScreen.preventAutoHideAsync();

export default function HomeScreen({ route, navigation }) {

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

    // calculate the current date
    function GetCurrentDate() {

        let date = new Date().getDate()
        let month = new Date().getMonth() + 1
        let year = new Date().getFullYear()

        // identify the month
        let monthName
        switch(month) {
            case 1:
                monthName = "January"
                break
            case 2:
                monthName = "February"
                break
            case 3: 
                monthName = "March"
                break
            case 4: 
                monthName = "April"
                break
            case 5:
                monthName = "May"
                break
            case 6:
                monthName = "June"
                break
            case 7: 
                monthName = "July"
                break
            case 8:
                monthName = "August"
                break
            case 9:
                monthName = "September"
                break
            case 10:
                monthName = "October"
                break
            case 11:
                monthName = "November"
                break
            case 12:
                monthName = "December"
                break
            default:
                throw new Error("Something went wrong with calculating the month.")
        }

        return (
            <View style={styles.container}>
                <Text><h1 style={{fontFamily: 'Titles', fontSize: '2em'}}>{date} {monthName} {year}</h1></Text>
            </View>
        )
    }

    // params
    const params = route.params
    let budget = params.updatedBudget
    let expensesData = params.EXPENSES
    let disabled = params.enableButton
    let sortDisabled = params.enableSortButton

    console.log(budget)

    // spent and remaining calculations
    const amountArray = expensesData.map((item) => item.amount)
    let amountNumbers = amountArray.map(Number)
    let length = amountNumbers.length
    let spentAmount = 0
    if (length === 1) {
        spentAmount = amountNumbers[0]
    } else if (length === 0) {
        spentAmount === 0
    } else {
        spentAmount = amountNumbers.reduce((a, b) => {
            return a + b
        })
    }

    if (length > 1) {
        sortDisabled = false
    } else {
        sortDisabled = true
    }

    spentAmount.toFixed(2)
    let remaining = budget - spentAmount
    remaining.toFixed(2)

    // display categories
    function ExpenseHistory () {      
        let sortedExpenses = expensesData.sort((p1, p2) => (p1.date > p2.date) ? -1 : (p1.date < p2.date) ? 1 : 0)
        console.log(sortedExpenses)
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={sortedExpenses}
                    extraData={sortedExpenses}
                    renderItem={({item}) => 
                        <View style={{padding: 10}}>
                            <Text style={{fontFamily: 'RegBoldItalic', fontSize: '2em'}}>{item.category}</Text>
                            <Text style={{fontFamily: 'RegBold', fontSize: '1em'}}>{item.date}{'\n'}${item.amount}{'\n'}{item.note}</Text>
                        </View>
                    }
                />
            </SafeAreaView>
        ) 
    }

    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            <GetCurrentDate />
            <View style={styles.format}>
                <Text style={{marginRight: '1em', marginBottom: '0.3em', fontFamily: 'RegBold', fontSize: '1.5em'}}>Current Budget: {budget}</Text>
                <Button
                    title="Set Budget"
                    titleStyle={{fontFamily: 'RegBold', fontSize:'1.5em'}}
                    onPress={() => navigation.navigate("Budget", {
                        enableButton: disabled, 
                        updatedBudget: budget
                    })}
                    buttonStyle={{width: 150, backgroundColor: "#FEC6DF"}}
                />
            </View>
            <Text style={{fontFamily: 'RegBold', fontSize: '1.5em'}}>Spent: {spentAmount}</Text>
            <Text style={{fontFamily: 'RegBold', fontSize: '1.5em', padding: 20}}>Remaining: {remaining}</Text>

            <View style={styles.format}>
                <Button
                    title="Add Expense"
                    onPress={() => navigation.navigate("Expense", {
                        EXPENSES: expensesData, 
                        updatedBudget: budget, 
                        enableButton: disabled
                    })}
                    titleStyle={{fontFamily: 'RegBold', fontSize:'1.5em'}}
                    buttonStyle={{width: 150, backgroundColor: "#FEC6DF"}}
                    disabled={disabled}
                />
                <View style={{width: 20}}/>
                <Button
                    title="Sort Expenses"
                    onPress={() => navigation.navigate("Sort", {
                        EXPENSES: expensesData, 
                        updatedBudget: budget, 
                        enableButton: disabled
                    })}
                    titleStyle={{fontFamily: 'RegBold', fontSize:'1.5em'}}
                    buttonStyle={{width: 150, backgroundColor: "#FEC6DF"}}
                    disabled={sortDisabled}
                />
            </View>
            <Text style={{fontFamily: 'Titles', padding: 20, fontSize: '1.5em'}}>Expense History</Text>
            <ExpenseHistory />

        </View>
        
    );
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
