import { StyleSheet, Text, View, Button } from 'react-native';
import { useCallback, useEffect, useState } from "react"
import { useFonts } from 'expo-font'


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      h1: {
        fontSize: "2em",
        fontFamily: 'Titles'
      }
    },
  });

export default function HomeScreen() {

    // fonts
    const [loaded] = useFonts({
        'Titles': require('../assets/fonts/')
    }) 

    if (!loaded) {
        throw new Error("Font didn't work :(")
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
                <Text><h1 style={{fontFamily: Titles}}>{date} {monthName} {year}</h1></Text>
            </View>
        )
    }

    return (
        <View>
            <GetCurrentDate />
        </View>
    )
}