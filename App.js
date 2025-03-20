import { useState } from "react"
import { ImageBackground, SafeAreaView, StyleSheet } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { useFonts } from "expo-font"
import StartGameScreen from "./screens/StartGameScreen"
import GameScreen from "./screens/GameScreen"
import GameOverScreen from "./screens/GameOverScreen"
import Colors from "./constants/colors"

export default function App() {
    const [userNumber, setUserNumber] = useState()
    const [gameIsOver, setGameIsOver] = useState(false)
    const [guessRounds, setGuessRounds] = useState(0)

    // const [loaded, error] = useFonts({
    //     "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    //     "open-sans-italic": require("./assets/fonts/OpenSans-Italic.ttf"),
    //     "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    // })

    const pickedNumberHandler = (pickedNumber) => {
        setUserNumber(pickedNumber)
    }

    const gameOverHandler = () => {
        setGameIsOver(true)
    }

    const startNewGameHandler = () => {
        setUserNumber(null)
        setGameIsOver(false)
        setGuessRounds(0)
    }

    let screen = <StartGameScreen onPickNumber={pickedNumberHandler} />

    if (userNumber) {
        screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    }

    if (gameIsOver && userNumber) {
        screen = (
            <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={startNewGameHandler} />
        )
    }

    return (
        <LinearGradient colors={[Colors.primary700, Colors.accent500]} style={styles.rootScreen}>
            <ImageBackground
                source={require("./assets/images/background.jpg")}
                resizeMode="cover"
                style={styles.rootScreen}
                imageStyle={styles.backgroundImage}
            >
                <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
            </ImageBackground>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    rootScreen: {
        flex: 1,
    },
    backgroundImage: {
        opacity: 0.15,
    },
})
