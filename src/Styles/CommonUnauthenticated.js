import {StyleSheet} from "react-native";
import colors from "../colors/colors";
import {windowHeight, windowWidth} from "../utils/Dimensions";

const CommonUnauthenticated = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
    },
    container2: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "baseline",
    },
    forgot: {
        fontSize: 16,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,
    },
    signup: {
        fontSize: 18,
        marginBottom: 30,
        color: colors.primary,
        fontWeight: "bold",
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: colors.secondary,
        width: windowWidth / 3.5,
        height: windowHeight / 17,
        padding: 10,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 25,
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 18,
        color: colors.black,
    },
});

export default CommonUnauthenticated;