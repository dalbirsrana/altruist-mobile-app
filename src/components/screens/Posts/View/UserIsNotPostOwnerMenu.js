import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../../navigation/AuthProvider";
import {useNavigation} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../../../colors/colors";
import API from "../../../../services/api";
import Fire from "../../../../services/Fire";

export default function UserIsPostOwnerMenu({dataProp, requestProp}) {

    const navigation = useNavigation();

    const {user, logout} = useContext(AuthContext);
    const [data, setData] = useState(dataProp);
    const [request, setRequest] = useState(requestProp);
    const [postStatus, setPostStatus] = useState(dataProp.status);

    const [requestInProgress, setRequestInProgress] = useState(false);


    const [numberOfChats, setNumberOfChats] = useState(0);
    const [userStartedChat, setUserStartedChat] = useState(false);

    async function isCHatAvailable(requestId) {

        console.log("requestId", requestId);

        if (requestId !== "") {
            Fire.shared.requestId = requestId;
            Fire.shared.doesChatExists(requestId, (message) => {
                if (message !== null) {
                    setUserStartedChat(true);
                }
            });

            Fire.shared.isRequestCHatAvailable((message) => {
                if (message.key === "request-" + requestId) {
                    setUserStartedChat(true);
                }
            });

            let tempChatUpdated = 0;
            Fire.shared.isRequestCHatUpdated(requestId, user, data.title ,(message) => {
                setUserStartedChat(true);

                if (message.val().user._id === user.id) {
                    tempChatUpdated = 0;
                } else {
                    tempChatUpdated++;
                }
                if (tempChatUpdated < 0) {
                    tempChatUpdated = 0;
                }
                setNumberOfChats(tempChatUpdated);

            });
        }

    }

    useEffect(() => {
        let unMounted = false;
        if (!unMounted) {
            if (requestProp != null) {
                setRequest(requestProp)
                isCHatAvailable(requestProp.id);
            }
        }
        return () => {
            unMounted = true;
            if (dataProp.id !== "") {
                Fire.shared.off();
            }
        }
    }, [dataProp, requestProp]);


    async function requestPost(id) {
        if (!requestInProgress) {
            setRequestInProgress(true);
            let returnedData = await API.Post.request(id);
            if (returnedData !== undefined && returnedData.success) {
                setRequestInProgress(false);
                setRequest(returnedData.data);

                Fire.shared.requestId = returnedData.data.id;
                Fire.shared.isRequestCHatAvailable((message) => {
                    if (message.key === "request-" + returnedData.data.id) {
                        setUserStartedChat(true);
                        setNumberOfChats(1);

                        let tempChatUpdated = 0;
                        Fire.shared.isRequestCHatUpdated(returnedData.data.id, user, data.title ,(message) => {
                            setUserStartedChat(true);

                            if (message.val().user._id === user.id) {
                                tempChatUpdated = 0;
                            } else {
                                tempChatUpdated++;
                            }
                            if (tempChatUpdated < 0) {
                                tempChatUpdated = 0;
                            }
                            setNumberOfChats(tempChatUpdated);

                        });

                    }
                });

            } else if (returnedData !== undefined && !returnedData.success) {
                if (returnedData.tokenExpired) {
                    logout();
                    setRequestInProgress(false);
                }
            }
        }
    }

    function startChat(id) {
        setNumberOfChats(0);
        // return navigation.navigate("ChatSingleScreen", {"requestIdProp": id, title: dataProp.title});

        navigation.navigate( "ChatList", {
            screen:"ChatSingleScreen", params: {"requestIdProp": id, title: dataProp.title}
        });
    }

    return (
        <View style={styles.innerFlexContainer}>
            <View style={styles.innerFlexContainer}>
                {request != null ?
                    <View style={styles.innerFlexContainer}>{
                        request.post_comment_type === "REQUEST" ?
                            <View style={styles.innerFlexContainer}>
                                {
                                    userStartedChat && request !== null ?
                                        <View style={{...styles.innerFlexContainer, position: "relative"}}>
                                            <TouchableOpacity onPress={() => {
                                                startChat(request.id)
                                            }}>
                                                <Ionicons style={{...styles.bottomButtonContainerIcon, paddingRight: 5}}
                                                          name={"ios-chatbubbles"} size={25} color={colors.primary}/>
                                                {
                                                    numberOfChats > 0 ?
                                                        <Text style={{
                                                            ...styles.innerFlexContainerText,
                                                            position: "absolute",
                                                            color: colors.white,
                                                            padding: 3,
                                                            fontSize: 10,
                                                            textAlign: "center",
                                                            borderRadius: 20,
                                                            width: 16,
                                                            height: 16,
                                                            top: 6,
                                                            left: 10
                                                        }}
                                                        >{numberOfChats}</Text>
                                                        : null
                                                }
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        <View style={styles.innerFlexContainer}>
                                            <Ionicons style={{...styles.bottomButtonContainerIcon, paddingRight: 5}}
                                                      name={"ios-send"} size={25} color={colors.primary}/>
                                            <Text style={{...styles.innerFlexContainerText}}>Request Pending</Text>
                                        </View>
                                }
                            </View>
                            :
                            <View style={styles.innerFlexContainer}>
                                <Ionicons style={{...styles.bottomButtonContainerIcon, paddingRight: 5}}
                                          name={"ios-send"} size={25} color={colors.primary}/>
                                <Text
                                    style={{...styles.innerFlexContainerText}}>Request {request.post_comment_type.toLowerCase()}{request.post_comment_type === "ACCEPT" ? "ed"
                                    : "d"
                                }</Text>
                            </View>
                    }</View>
                    :
                    <TouchableOpacity style={styles.innerFlexContainer} onPress={() => {
                        requestPost(data.id)
                    }}>
                        <Ionicons style={{...styles.bottomButtonContainerIcon, paddingRight: 5}} name={"ios-send"}
                                  size={25} color={colors.primary}/>
                        <Text style={{...styles.innerFlexContainerText, paddingTop: 10}}>Send Request</Text>
                    </TouchableOpacity>
                }

            </View>
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
