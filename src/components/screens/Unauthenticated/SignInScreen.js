import React, {useState, useContext, useEffect} from "react";
import {TouchableOpacity, Text, Image, StyleSheet, View} from "react-native";

import FormButton from "../../../common/FormButton";
import FormInput from "../../../common/FormInput";
import {AuthContext} from "../../navigation/AuthProvider";

import logo from "../../../../assets/icon.png";
import colors from "../../../colors/colors";
import {windowHeight, windowWidth} from "../../../utils/Dimensions";

const SignInScreen = ({navigation}) => {
    const [email, setEmail] = useState("user@mylangara.ca");
    const [password, setPassword] = useState("jaimin");

    const [loginInProgress, setLoginInProgress] = useState(false);

    const [msg, setMsg] = useState("");
    const {user, login} = useContext(AuthContext);

    const isUserSignedOut = () => {
        return typeof user === "undefined" || (typeof user !== "undefined" && user.isSignout === true);
    }

    async function checkUserLoggedIn() {
        if (!isUserSignedOut()) {
            setLoginInProgress(true);
            await navigation.navigate("HomeTabs", {screen: 'HomeStack', params: {screen: 'Home'} } );
        }
    }

    useEffect(() => {
        let isUnMount = false;
        if (!isUnMount) {
            checkUserLoggedIn();
        }
        return () => {
            isUnMount = true;
        }
    }, []);

    return (
        <View style={styles.container}>
            <Image
                source={logo}
                style={{width: 200, height: 200, marginBottom: 20}}
            />

            <Text>{msg}</Text>

            {(typeof user !== "undefined" && user.hasOwnProperty('logoutMsg') && user.logoutMsg !== false) ?
                <Text>{user.logoutMsg}</Text>
                : null
            }

            <FormInput
                value={email}
                placeholderText="Email"
                onChangeText={(userEmail) => setEmail(userEmail)}
                autoCapitalize="none"
                keyboardType="email-address"
                autoCorrect={false}
            />

            <FormInput
                value={password}
                placeholderText="Password"
                onChangeText={(userPassword) => setPassword(userPassword)}
                secureTextEntry={true}
            />

            <FormButton
                loadingProp={loginInProgress}
                buttonTitle="Login"
                onPress={async () => {
                    setLoginInProgress(true);
                    let data = {
                        username: email,
                        password: password,
                    };

                    try {
                        console.log('signInStart')
                        let signIn = await login(data);
                        console.log('signIn', signIn);
                        if (typeof signIn !== "undefined" && signIn.hasOwnProperty('success') && signIn.success === true) {
                            setPassword("");
                            setLoginInProgress(false);
                            navigation.navigate("HomeTabs", {screen: 'HomeStack', params: {screen: 'Home'} } );
                        } else {
                            if (typeof signIn !== "undefined") {
                                if (signIn.hasOwnProperty('data')) {
                                    if (signIn.data.hasOwnProperty('username') && signIn.data.username) setMsg(signIn.data.username);
                                    if (signIn.data.hasOwnProperty('verification_token') && signIn.data.verification_token) setMsg(signIn.data.verification_token);
                                    if (signIn.data.hasOwnProperty('message') && signIn.data.message) setMsg(signIn.data.message);
                                }
                            }
                            setLoginInProgress(false);
                        }
                    } catch (error) {
                        setLoginInProgress(false);
                        console.log("Error", error)
                        throw error
                    }

                }}
            />

            <TouchableOpacity onPress={() => navigation.navigate("ResetPassword")}>
                <Text style={styles.forgot}>Forget Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("VerifyAccount")}>
                <Text style={styles.forgot}>Verify Account?</Text>
            </TouchableOpacity>
            <View style={styles.container2}>
                <Text style={styles.forgot}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                    <Text style={styles.signup}>SignUp</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    return navigation.navigate("UnauthenticatedHomeScreen");
                }}
            >
                <Text style={styles.buttonText}>Skip</Text>
            </TouchableOpacity>
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
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
