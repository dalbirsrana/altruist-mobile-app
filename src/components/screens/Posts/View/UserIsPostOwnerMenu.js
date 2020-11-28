import {StyleSheet, Text, View} from "react-native";
import React, {useContext, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {AuthContext} from "../../../navigation/AuthProvider";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../../../colors/colors";

export default function UserIsNotPostOwnerMenu({dataProp, requestsProp}) {

    const navigation = useNavigation();

    const {user, logout} = useContext(AuthContext);
    const [data, setData] = useState(dataProp);
    const [requests, setRequests] = useState(requestsProp);
    const [postStatus, setPostStatus] = useState(dataProp.status);

    React.useEffect(() => {
        let isUnMount = false;
        if (!isUnMount) {
            setRequests(requestsProp);
        }
        setRequests(requestsProp);
        return () => {
            isUnMount = true;
        }
    }, [requestsProp])

    return (
        <View style={styles.innerFlexContainer}>
            <Ionicons style={{...styles.bottomButtonContainerIcon, paddingRight: 5}} name={"ios-send"} size={25}
                      color={colors.primary}/>
            <Text style={{...styles.innerFlexContainerText}}>
                {
                    requests.length > 0 ?
                        <Text>{requests.length + " Requests"}</Text>
                        : "No Requests"
                }
            </Text>
        </View>
    );
}


const styles = StyleSheet.create({

    bottomButtonContainerIcon: {
        padding: 5
    },
    innerFlexContainerText: {
        padding: 8,
        paddingLeft: 0,
        color: colors.primary,
        fontSize: 14,
    },
    bottomButtonContainer: {
        display: "flex",
        paddingTop: 10,
        flexDirection: "row",
        flexWrap: "nowrap",
    },
    headerButtonContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        alignSelf: "flex-end"
    },
    innerFlexContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
    }

});
