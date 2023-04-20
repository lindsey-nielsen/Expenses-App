import { StyleSheet, Text, View, Button } from 'react-native';
import { useCallback, useEffect, useState } from "react"

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default function HomeScreen() {

    function getCurrentDate() {
        let date = new Date().getDate()
        let month = new Date().getMonth() + 1
        let year = new Date().getFullYear()

        return (
            <View style={styles.container}>
                <Text>{date}{month}{year}</Text>
            </View>
        )
    }

    return (
        <View>
            <getCurrentDate />
        </View>
    )
}