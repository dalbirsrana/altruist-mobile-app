import color from "../../../colors/colors";
import colors from "../../../colors/colors";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import postImage from "../../../../assets/user-avatar.png";
import moment from "moment";
import React, {useContext, useEffect, useRef, useState} from "react";
import Fire from "../../../services/Fire";
import {windowHeight, windowWidth} from "../../../utils/Dimensions";
import {AuthContext} from "../../navigation/AuthProvider";


const ChatListItem = ( {index, post: chatRequest , navigation, popOutChat} ) => {

    const {user, logout} = useContext(AuthContext);
    const notificationListener = useRef();
    const responseListener = useRef();

    const [newMessageArrived, setNewMessageArrived] = useState(false);

    const [lastChatTime, setLastChatTime] = useState(chatRequest.created_at);
    const [lastChatItem, setLastChatItem] = useState("");
    const [numberOfChats, setNumberOfChats] = useState(0);
    const [userStartedChat, setUserStartedChat] = useState(false);

    async function isCHatAvailable(requestId) {

        console.log("requestId", requestId);

        if (typeof requestId !== "undefined" && requestId !== "" && requestId !== null) {
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
            Fire.shared.isRequestCHatUpdated(requestId, user,  chatRequest.post.title ,(message) => {
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
                setLastChatItem( message.val().text );
                setLastChatTime( message.val().timestamp/1000 );

                popOutChat( requestId );
            });
        }

    }

    useEffect(() => {
        let isUnMount = false;
        if (!isUnMount) {
            isCHatAvailable(chatRequest.id);
            if( chatRequest.hasOwnProperty('newMessageArrived') && chatRequest.newMessageArrived === true ){
                setNewMessageArrived( chatRequest.newMessageArrived );
            }
        }
        return () => {
            isUnMount = true;
        }
    }, []);

    let BGColor = color.white

    if (index % 2 !== 0) {
        BGColor = color.primaryTransparent
    } else {
        BGColor = color.secondaryTransparent
    }


    return (
        <TouchableOpacity
            onPress={
                () => {
                    navigation.navigate("ChatSingleScreen", {"requestIdProp": chatRequest.id, title: chatRequest.post.title});
                }
            }
        >
            <View style={{backgroundColor: BGColor}}>
                <View style={styles.postCard}>
                    {chatRequest.user.profile_picture
                        ? (<Image source={{uri: chatRequest.user.profile_picture}} style={styles.postImage}/>)
                        : (<Image source={postImage} style={styles.postImage}/>)
                    }
                    <View style={styles.textContent}>

                        <Text style={{fontWeight:"bold"}} >{chatRequest.post.title}</Text>
                        <Text style={{fontWeight:"bold"}} >{chatRequest.user.fullName}</Text>


                        <View style={{ ...styles.innerFlexContainer , justifyContent:"space-between", marginTop:10 }} >
                            <Text style={{}} >{lastChatItem}</Text>
                            <View style={{
                                alignSelf:"flex-end",
                                position: "relative",
                                width: 30,
                                height: 30,
                                borderRadius: 15,
                                padding:5,
                                backgroundColor: colors.secondary
                            }}>
                                    <Text style={{
                                        color: colors.primary,
                                        textAlign: "center",
                                        fontSize: 16,
                                        fontWeight: 'bold',
                                        alignSelf:"center"
                                    }}
                                    >{numberOfChats}</Text>
                            </View>
                        </View>



                        <View style={{ ...styles.innerFlexContainer , justifyContent:"flex-start" }} >
                            <View style={{...styles.tagsContainer}}>
                                <Text
                                    style={{...styles.tag ,
                                        color : 'white',
                                        backgroundColor: chatRequest.post.postType.title === "Help Needed" ?  colors.primary : colors.secondaryStrong ,
                                    }}>{chatRequest.post.postType.title === "Help Needed" ? "wants help" : "want to help"}</Text>
                                <Text style={{...styles.tag}}>{chatRequest.post.postCategory.title}</Text>
                            </View>

                        </View>

                        <Text style={{
                            ...styles.textCommentType,
                            textAlign: "left",
                            fontSize: 12,
                            marginTop: 15
                        }}>{moment.unix( lastChatTime ).fromNow()}</Text>

                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default ChatListItem;

const styles = StyleSheet.create({

    innerFlexContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
    },

    iconContaner: {
        flex: 1,
        width: 50,
        height: 50,
        position: "relative",
    },

    tagsContainer: {
        display: "flex",
        marginTop: 10,
        flexDirection: "row",
        flexWrap: "nowrap"
    },

    tag: {
        color: colors.primary,
        backgroundColor: "transparent",
        fontSize: 12,
        marginRight: 10,
        padding: 5,
        borderWidth: 1,
        borderColor: colors.primary,
        borderRadius: 10,
        textAlign: "center",
        textTransform: "capitalize",
    },


    icon: {

        backgroundColor: "white",
        borderRadius: 20,
        borderColor: colors.primary,
        borderWidth: 1,
        padding: 10,

        flex: 1,
        width: 40,
        height: 40,
        position: "absolute",
        left: -25,
        top: 30,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },

    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'column',
    },
    header: {
        paddingBottom: 15,
        height: windowHeight / 10,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: color.primary,
        color: '#ffffff',
    },
    headerText: {
        fontSize: 18,
        color: 'white',
        fontWeight: 'bold'
    },
    postCard: {
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',

    },
    postImage: {
        width: windowWidth / 6,
        height: windowWidth / 6,
        borderRadius: windowWidth / 12,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

    },
    textContent: {
        width: windowWidth / 1.3,
        paddingLeft: 20,
    },
    textCommentType: {
        color: color.primary,
        fontWeight: 'bold',
        marginBottom: 5,
    },

    bottomButtonContainerIcon: {
        padding: 5
    },

    innerFlexContainerText: {
        padding: 8,
        paddingLeft: 0,
        color: colors.primary,
        fontSize: 14,
    },
});
