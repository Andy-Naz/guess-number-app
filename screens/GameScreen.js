import { useState } from "react"
import { Alert, StyleSheet, Text, View } from "react-native"
import Title from "../components/ui/Title"
import NumberContainer from "../components/game/NumberContainer"
import PrimaryButton from "../components/ui/PrimaryButton"

function generateRandomBetween(min, max, exclude) {
    const randomNumber = Math.floor(Math.random() * (max - min)) + min

    if (randomNumber === exclude) {
        return generateRandomBetween(min, max, exclude)
    }
    return randomNumber
}

let minBoundary = 1
let maxBoundary = 100

const GameScreen = ({ userNumber }) => {
    const initialGuess = generateRandomBetween(minBoundary, maxBoundary, userNumber)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)

    console.log(currentGuess)
    const nextGuessHandler = (direction) => {
        if (
            (direction === "lower" && currentGuess < userNumber) ||
            (direction === "higher" && currentGuess > userNumber)
        ) {
            Alert.alert("Don't lie!", "You know that this is wrong...", [{ text: "Sorry", style: "cancel" }])
            return
        }

        if (direction === "lower") {
            maxBoundary = currentGuess
        } else {
            minBoundary = currentGuess + 1
        }
        console.log(minBoundary, maxBoundary)
        const newRandomNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess)
        setCurrentGuess(newRandomNumber)
    }

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <View>
                <Text>Higher or lower?</Text>
                <View>
                    <PrimaryButton onPress={() => nextGuessHandler("lower")}>-</PrimaryButton>
                    <PrimaryButton onPress={() => nextGuessHandler("higher")}>+</PrimaryButton>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginTop: 32,
        padding: 12,
    },
})

export default GameScreen
