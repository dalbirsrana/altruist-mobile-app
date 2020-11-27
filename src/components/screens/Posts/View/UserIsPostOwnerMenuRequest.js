import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {AuthContext} from "../../../navigation/AuthProvider";
import Ionicons from "react-native-vector-icons/Ionicons";
import colors from "../../../../colors/colors";
import Fire from "../../../../services/Fire";
import Loading from "../../../../common/Loading";
import LoadableImage from "../../../../common/LoadableImage";
import postImage from "../../../../../assets/user-avatar.png";
import moment from "moment";
import {windowWidth} from "../../../../utils/Dimensions";
import API from "../../../../services/api";

export default function UserIsPostOwnerMenuRequest( { dataProp,  requestProp , setAcceptedRequest , setPostStatus, setRequests , requests } ){

    const navigation = useNavigation();
    const {user, logout} = useContext(AuthContext);

    const [ requestsItem , setRequestItem ] = useState( requestProp ) ;
    const [requestDecisionInProcess, setRequestDecisionInProcess] = useState(false);

    const [numberOfChats, setNumberOfChats] = useState( 0 );
    const [userStartedChat, setUserStartedChat] = useState( false );

    async function isCHatAvailable( requestId ){

        console.log( "requestId" , requestId  );

        if( requestId !== "" ){
            Fire.shared.requestId = requestId;
            Fire.shared.doesChatExists( requestId , ( message ) => {
                if( message !== null ){
                    setUserStartedChat( true );
                }
            });

            Fire.shared.isRequestCHatAvailable( ( message ) => {
                if( message.key === "request-"+requestId ){
                    setUserStartedChat( true );
                }
            });

            let tempChatUpdated = 0 ;
            Fire.shared.isRequestCHatUpdated( requestId , ( message ) => {
                setUserStartedChat( true );

                if( message.val().user._id === user.id ){
                    tempChatUpdated--;
                }else{
                    tempChatUpdated++;
                }
                if( tempChatUpdated < 0 ){
                    tempChatUpdated = 0;
                }
                setNumberOfChats( tempChatUpdated );

            });
        }

    }

    React.useEffect(() => {
        let isUnMount = false;
        if (!isUnMount) {
            setRequestItem( requestProp );
            if( requestProp != null ){
                isCHatAvailable( requestProp.id );
            }
        }
        return () => {
            isUnMount = true;
        }
    } , [ requestProp ])

    async function acceptRequest(id) {
        if (!requestDecisionInProcess ) {
            setRequestDecisionInProcess(true);
            let returnedData = await API.Post.accept(id);
            if (returnedData !== undefined && returnedData.success) {
                setRequestDecisionInProcess(false);
                setAcceptedRequest( returnedData.data );
                setPostStatus(6);
            } else if (returnedData !== undefined && !returnedData.success) {
                setRequestDecisionInProcess(false);
                if (returnedData.tokenExpired) {
                    logout();
                }
            }
        }
    }

    async function declineRequest(id) {
        if (!requestDecisionInProcess ) {
            setRequestDecisionInProcess(true);
            let returnedData = await API.Post.decline(id);
            if (returnedData !== undefined && returnedData.success) {
                setRequestDecisionInProcess(false);

                let newRequests = [] ;
                for( let request of requests ){
                    if( request.id !== id ){
                        newRequests.push( request );
                    }
                }
                setRequests( newRequests );

            } else if (returnedData !== undefined && !returnedData.success) {
                setRequestDecisionInProcess(false);
                if (returnedData.tokenExpired) {
                    logout();
                }
            }
        }
    }

    function startChat( id ){
        navigation.navigate("ChatSingleScreen",{"requestIdProp": id , title: dataProp.title  });
    }

    return (
        <View style={styles.requestContainerParent}  >

            { requestDecisionInProcess ?
                <View style={styles.absoluteCenterLoader} >
                    <Loading />
                </View>
                : null
            }


            <View style={{ ...styles.userContainer , marginBottom:0 }} >
                <View style={{ ...styles.userPicContainer , width: 25,
                    height: 20,
                    borderRadius: 12 }}>
                    <View style={styles.userContainer}>
                        <View style={{ ...styles.userPicContainer,   width: 20,
                            height: 20,
                            borderRadius: 12 }}>
                            {
                                requestsItem.user.profile_picture ?
                                    <LoadableImage
                                        source={{uri: requestsItem.user.profile_picture}}
                                        styleData={{width: 20, height: 20, borderRadius: 10}}/>
                                    :
                                    <LoadableImage
                                        source={postImage}
                                        styleData={{width: 20, height: 20, borderRadius: 10}}/>
                            }
                        </View>
                    </View>
                </View>
                <View style={{flex: 1}}>
                    <Text style={{ ...styles.userName , fontSize: 12 }}>
                        {requestsItem.user.fullName}
                    </Text>
                    <Text style={{...styles.locationLabel, textAlign: "left", fontSize: 8}}>{moment.unix( requestsItem.created_at ).fromNow() }</Text>
                </View>
                <View style={{ ...styles.innerFlexContainer , alignSelf: "flex-end"}}>
                    <View style={{...styles.tagsContainer2 , padding: 5 , paddingTop:0, marginTop:0 }}>
                        <Text style={{...styles.tag , fontSize: 8,
                            marginRight: 5,
                            padding: 4,
                            borderRadius: 3 }}>Request</Text>
                    </View>
                </View>
            </View>
            <View style={{ ...styles.bottomRequestContainer, justifyContent: "space-between" }} >
                <View style={{ ...styles.innerFlexContainer , flexWrap: "wrap"  }}>
                    <Text >{requestsItem.text}</Text>
                </View>
            </View>
            <View style={{ ...styles.bottomRequestContainer, justifyContent: "flex-end" }} >
                <View style={{ ...styles.innerFlexContainer , marginTop:10 }} >

                    <TouchableOpacity onPress={() => {
                        acceptRequest(requestsItem.id)
                    }}>
                        <Ionicons style={{ ...styles.bottomButtonContainerIcon , padding:5 , paddingTop: 0, marginTop : -5}}
                                  name={"ios-checkmark-circle-outline"} size={30} color={colors.primary}/>
                    </TouchableOpacity>

                </View>
                <View style={{ ...styles.innerFlexContainer, marginTop:10  }} >

                    <TouchableOpacity onPress={() => {
                        declineRequest(requestsItem.id)
                    }}>
                        <Ionicons style={{ ...styles.bottomButtonContainerIcon , padding:5 ,  paddingTop: 0, marginTop : -5}}
                                  name={"ios-close-circle-outline"} size={30} color={colors.primary}/>
                    </TouchableOpacity>

                </View>
                <View style={{ ...styles.innerFlexContainer, marginTop:10 , position:"relative"  }} >

                    <TouchableOpacity onPress={() => {
                        startChat(requestsItem.id)
                    }}>
                        <Ionicons style={{ ...styles.bottomButtonContainerIcon , padding:5 ,  paddingTop: 0, marginTop : -5}}
                                  name={"ios-chatbubbles"} size={30} color={colors.primary}/>
                        {
                            numberOfChats > 0 ?
                                <Text style={{ ...styles.innerFlexContainerText ,
                                    position:"absolute" ,
                                    color: colors.white ,
                                    padding:3,
                                    fontSize:10,
                                    textAlign: "center" ,
                                    borderRadius:20,
                                    width: 16,
                                    height:16,
                                    top:-2,
                                    left:12
                                }}
                                >{numberOfChats}</Text>
                                : null
                        }
                    </TouchableOpacity>

                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({

    bottomRequestContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        paddingTop: 5,
        paddingBottom: 5,
    },

    bottomButtonContainerIcon: {
        padding: 5
    },

    innerFlexContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
    },

    requestContainerParent : {
        display: "flex",
        flexDirection: "column",
        flexWrap: "nowrap",
        marginBottom:0,
        paddingTop: 10,
        paddingBottom: 0,
        borderTopWidth: 2,
        borderTopColor: colors.primary,
        position: "relative"
    },
    absoluteCenterLoader : {
        position:'absolute',
        alignSelf:"center",
        zIndex:1001,
        backgroundColor:colors.loadingTransparent,
        top:0,
        bottom:0,
        left:0,
        right:0
    },

    userContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap"
    },
    userPicContainer: {
        width: 45,
        height: 35,
        borderRadius: 15
    },
    locationLabel: {
        color: colors.primary,
        fontSize: 12,
        marginTop: 0,
        marginBottom: 0,
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
    containerReview: {
        display: "flex",
        height: "auto",
        marginTop: 10,
        marginBottom: 10,
        width: windowWidth,
        textAlign: 'left',
        justifyContent: "flex-start",
        alignItems: "flex-start",
        alignSelf: "flex-start",
    },
    containerReviewHeader: {
        fontSize: 16,
        justifyContent: "center",
        alignItems: "center",
        color: "rgb(16,14,14)",
        textAlign: "center",
    },
    layoutContainer: {
        display: "flex",
        height: 100,
        marginTop: 10,
        marginBottom: 10,
        width: windowWidth,
    },
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: colors.white,
        marginBottom: 10,
        padding: 10,
        position: "relative"
    },


});
