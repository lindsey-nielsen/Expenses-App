import { useCallback, useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { Input, Button } from "@rneui/themed"
import { SelectList } from 'react-native-dropdown-select-list';

SplashScreen.preventAutoHideAsync();

export default function SortScreen({ route, navigation }) {
    let [category, setCategory] = useState("")
    let [disabled, setDisabled] = useState(true)
    let [disabled2, setDisabled2] = useState(true)
    let [sortedData, setSortedData] = useState("")
    let [priceSort, setPriceSort] = useState("")

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

    let params = route.params
    let expensesData = params.EXPENSES
    let categoriesArr = ['food and dining', 'rent, utilities, and bills', 'travel', 'pet', 'subscriptions', 'education', 'shopping', 'entertainment', 'health and fitness', 'personal care']
    let amountArr = ['high', 'low']

    function sortByCategory(req) {
        let arr = expensesData.filter(item => {
            if (item.category === req) {
                return true
            }

            return false
        })

        let categoryDisplay = 
            <SafeAreaView style={styles.container}>
            <Text style={{fontFamily: 'RegBoldItalic', fontSize:'2em'}}>{category}</Text>
                <FlatList 
                    data={arr}
                    extraData={arr}
                    renderItem={({item}) => 
                        <View style={{padding: 10}}>
                            <Text style={{fontFamily: 'RegBold'}}>{item.amount}</Text>
                            <Text style={{fontFamily: 'RegBold'}}>{item.date}</Text>
                            <Text style={{fontFamily: 'RegBold'}}>{item.note}</Text>
                        </View>
                    }
                />
            </SafeAreaView> 
        
        setSortedData(categoryDisplay)
    }

    function sortByPrice(req) {
        let sortByPrice
        if (req === 'high') {
            sortByPrice = expensesData.sort((p1, p2) => (p1.amount > p2.amount) ? -1 : (p1.amount < p2.amount) ? 1 : 0)
        } else if (req === 'low') {
            sortByPrice = expensesData.sort((p1, p2) => (p1.amount > p2.amount) ? 1 : (p1.amount < p2.amount) ? -1 : 0)
        }

        let priceDisplay = 
            <SafeAreaView style={styles.container}>
                <Text style={{fontFamily: 'RegBoldItalic', fontSize:'2em'}}>{priceSort}</Text>
                <FlatList 
                    data={sortByPrice}
                    extraData={sortByPrice}
                    renderItem={({item}) => 
                        <View style={{padding: 10}}>
                            <Text style={{fontFamily: 'RegBold'}}>{item.amount}</Text>
                            <Text style={{fontFamily: 'RegBold'}}>{item.category}</Text>
                            <Text style={{fontFamily: 'RegBold'}}>{item.date}</Text>
                            <Text style={{fontFamily: 'RegBold'}}>{item.note}</Text>
                        </View>
                    }
                />
            </SafeAreaView>

        setSortedData(priceDisplay)
    }

    function validateCat() {
        if (category) {
            setDisabled(false)
        }
    }

    function validatePrice() {
        if (priceSort) {
            setDisabled2(false)
        }
    }

    return (
        <View style={styles.container} onLayout={onLayoutRootView}>
            <Text style={{fontFamily: 'Titles', fontSize: '2em'}}>Sort Expenses</Text>
            <Text style={{fontFamily: 'RegBold', fontSize: '2em'}}>Sort by...</Text>
            <View style={styles.format}>
                <SelectList 
                    setSelected={(val) => setCategory(val)}
                    data={categoriesArr}
                    fontFamily='RegBold'
                    onSelect={(val) => { 
                        validateCat()
                    }}
                />
                <View style={{width: 20}}/>
                <Button 
                    title="Category"
                    disabled={disabled}
                    onPress={() => sortByCategory(category)}
                    titleStyle={{fontFamily: 'Titles', fontSize:'1.5em'}}
                    buttonStyle={{width: 150, backgroundColor: "#FEC6DF"}}
                />
            </View>
            <View style={styles.format}>
                <SelectList 
                    setSelected={(val) => setPriceSort(val)}
                    data={amountArr}
                    fontFamily='RegBold'
                    onSelect={(val) => {
                        validatePrice()
                    }}
                />
                <View style={{width: 20}}/>
                <Button 
                    title="Price"
                    disabled={disabled2}
                    onPress={() => sortByPrice(priceSort)}
                    titleStyle={{fontFamily: 'Titles', fontSize:'1.5em'}}
                    buttonStyle={{width: 150, backgroundColor: "#FEC6DF"}}
                />
            </View>
            <Text>{sortedData}</Text>
            <Button 
                title="Home"
                onPress={() => navigation.navigate("Home")}
                titleStyle={{fontFamily: 'Titles', fontSize:'1.5em'}}
                buttonStyle={{width: 150, backgroundColor: "#FEC6DF"}}
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
