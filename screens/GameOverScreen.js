import { Image, View, StyleSheet, Text } from "react-native"
import Title from "../components/ui/Title"
import Colors from "../constants/colors"
import PrimaryButton from "../components/ui/PrimaryButton"

const GameOverScreen = ({ userNumber, roundsNumber, onStartNewGame }) => {
    return (
        <View style={styles.rootContainer}>
            <Title>GAME OVER</Title>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={require("../assets/images/game_over.jpg")} />
            </View>
            <Text style={styles.summaryText}>
                Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess the number{" "}
                <Text style={styles.highlight}>{userNumber}</Text>.
            </Text>
            <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        margin: 12,
        justifyContent: "center",
        alignItems: "center",
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: Colors.standardDark,
        overflow: "hidden",
        marginVertical: 30,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    summaryText: {
        fontSize: 24,
        textAlign: "center",
        marginVertical: 24,
    },
    highlight: {
        color: Colors.primary500,
    },
})

export default GameOverScreen
