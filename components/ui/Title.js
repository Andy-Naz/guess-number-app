import { Text, StyleSheet } from "react-native"
import Colors from "../../constants/colors"

const Title = ({ children }) => {
    return <Text style={styles.title}>{children}</Text>
}

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: Colors.standardLight,
        textAlign: "center",
        borderWidth: 2,
        borderColor: Colors.standardLight,
        padding: 12,
    },
})
export default Title
