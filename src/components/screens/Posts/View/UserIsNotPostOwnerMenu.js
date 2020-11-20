import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useContext, useState} from "react";
import {AuthContext} from "../../../navigation/AuthProvider";
import {useNavigation} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {windowWidth} from "../../../../utils/Dimensions";
import colors from "../../../../colors/colors";
import API from "../../../../services/api";

export default function UserIsPostOwnerMenu( { dataProp , requestProp } ){

    const navigation = useNavigation();

    const {user, logout} = useContext(AuthContext);
    const [data, setData] = useState( dataProp );
    const [request, setRequest] = useState( requestProp );
    const [postStatus, setPostStatus] = useState( dataProp.status );


    const [requestInProgress, setRequestInProgress] = useState( false );

    async function requestPost( id ){
        if( !requestInProgress ){
            setRequestInProgress( true );
            let returnedData = await API.Post.request( id );
            if (returnedData !== undefined && returnedData.success ) {
                setRequestInProgress( false );
                setRequest( returnedData.data );
            }else if( returnedData !== undefined && !returnedData.success ){
                if( returnedData.tokenExpired ){
                    logout();
                    setRequestInProgress( false );
                }
            }
        }
    }

    return (
        <View  style={styles.innerFlexContainer} >
            <View style={styles.innerFlexContainer} >
                { request != null ?
                    <View style={styles.innerFlexContainer} >{
                        request.post_comment_type === "REQUEST" ?
                            <View style={styles.innerFlexContainer}>
                                <Ionicons style={{ ...styles.bottomButtonContainerIcon , paddingRight: 5 }} name={"ios-send"} size={25} color={colors.primary} />
                                <Text style={{ ...styles.innerFlexContainerText }} >Request Pending</Text>
                            </View>
                            :
                            <View style={styles.innerFlexContainer}>
                                <Ionicons style={{ ...styles.bottomButtonContainerIcon , paddingRight: 5 }} name={"ios-send"} size={25} color={colors.primary} />
                                <Text style={{ ...styles.innerFlexContainerText  }} >Request {request.post_comment_type.toLowerCase()}{ request.post_comment_type === "ACCEPT" ? "ed"
                                    : "d"
                                }</Text>
                            </View>
                    }</View>
                     :
                    <TouchableOpacity style={styles.innerFlexContainer}  onPress={()=>{ requestPost( data.id ) }} >
                        <Ionicons style={{ ...styles.bottomButtonContainerIcon , paddingRight: 5 }} name={"ios-send"} size={25} color={colors.primary} />
                        <Text style={{ ...styles.innerFlexContainerText , paddingTop:10 }} >Send Request</Text>
                    </TouchableOpacity>
                }

            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    bottomButtonContainerIcon : {
        padding:5
    },
    innerFlexContainerText : {
        padding:8,
        paddingLeft:0,
        color: colors.primary,
        fontSize: 14,
    },

    bottomButtonContainer : {
        display: "flex",
        paddingTop: 10,
        flexDirection: "row",
        flexWrap: "nowrap",
    },
    headerButtonContainer : {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        alignSelf:"flex-end"
    },
    innerFlexContainer : {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
    }

});
