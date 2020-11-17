import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useContext, useState} from "react";
import {AuthContext} from "../../../navigation/AuthProvider";
import {useNavigation} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {windowWidth} from "../../../../utils/Dimensions";
import colors from "../../../../colors/colors";
import API from "../../../../services/api";

export default function UserIsPostOwnerMenu( { dataProp } ){

    const navigation = useNavigation();

    const {user, logout} = useContext(AuthContext);
    const [data, setData] = useState( dataProp );
    const [request, setRequest] = useState( dataProp.request );

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
                                <Ionicons style={{ ...styles.bottomButtonContainerIcon , paddingRight: 5 }} name={"ios-send"} size={25} color={"palevioletred"} />
                                <Text style={{ ...styles.innerFlexContainerText }} >Request Pending</Text>
                            </View>
                            : <Text style={{ ...styles.innerFlexContainerText  }} >Request {request.post_comment_type}ed</Text>
                    }</View>
                     :
                    <TouchableOpacity style={styles.innerFlexContainer}  onPress={()=>{ requestPost( data.id ) }} >
                        <Ionicons style={{ ...styles.bottomButtonContainerIcon , paddingRight: 5 }} name={"ios-send"} size={25} color={"palevioletred"} />
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
        color: "palevioletred",
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
