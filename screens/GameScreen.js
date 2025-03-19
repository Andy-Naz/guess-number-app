import { useState, useEffect } from "react"
import { Alert, StyleSheet, View } from "react-native"
import Title from "../components/ui/Title"
import NumberContainer from "../components/game/NumberContainer"
import PrimaryButton from "../components/ui/PrimaryButton"
import InstructionText from "../components/ui/InstructionText"
import Card from "../components/ui/Card"

function generateRandomBetween(min, max, exclude) {
    if (max - min <= 1) {
        console.warn("The range is too small, it is impossible to select a random number.")
        return min
    }

    let randomNumber
    do {
        randomNumber = Math.floor(Math.random() * (max - min)) + min
    } while (randomNumber === exclude)

    return randomNumber
}

let minBoundary = 1
let maxBoundary = 100

const GameScreen = ({ userNumber, onGameOver }) => {
    const initialGuess = generateRandomBetween(minBoundary, maxBoundary, userNumber)
    const [currentGuess, setCurrentGuess] = useState(initialGuess)

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver()
        }
    }, [currentGuess, userNumber, onGameOver])

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
            <Card>
                <InstructionText extraStyles={styles.instructionText}>Higher or lower?</InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={() => nextGuessHandler("higher")}>+</PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={() => nextGuessHandler("lower")}>-</PrimaryButton>
                    </View>
                </View>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        marginTop: 32,
        padding: 12,
    },
    instructionText: {
        marginBottom: 12,
    },
    buttonsContainer: {
        flexDirection: "row",
    },
    buttonContainer: {
        flex: 1,
    },
})

export default GameScreen
