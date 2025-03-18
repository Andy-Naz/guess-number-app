import { useState, useEffect } from "react"
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

const GameScreen = ({ userNumber, onGameOver }) => {
    const initialGuess = generateRandomBetween(1, 100, userNumber)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)

    console.log("initialGuess", initialGuess)
    console.log("currentGuess", currentGuess)

    console.log("minBoundary", minBoundary)
    console.log("maxBoundary", maxBoundary)

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver()
        }
        console.log("userNumber", userNumber)
    }, [currentGuess, userNumber])

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
                    <PrimaryButton onPress={() => nextGuessHandler("higher")}>+</PrimaryButton>
                    <PrimaryButton onPress={() => nextGuessHandler("lower")}>-</PrimaryButton>
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
