import React, {useContext, useState, useEffect } from "react";
import {Platform, KeyboardAvoidingView, SafeAreaView, View, StyleSheet, Text} from "react-native";
import { GiftedChat , Bubble } from "react-native-gifted-chat";
import Fire from "./../../../services/Fire";
import {AuthContext} from "../../navigation/AuthProvider";
import colors from "../../../colors/colors";
import getRouteParam from "../../helper/getRouteParam";



export default function Chat( { navigation , route , title } ){

    const [ messages , setMessages ] = useState([]);

    const {user, logout} = useContext(AuthContext);
    let requestId = getRouteParam( route ,"requestIdProp" , ""  ) ;
    let titleGiven = getRouteParam( route ,"title" , ""  ) ;

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: titleGiven
        });

    }, [requestId , titleGiven]);

    useEffect( () => {
        let unMounted = false ;

        if( requestId !== "" ){
            Fire.shared.requestId = requestId
            Fire.shared.on( ( message ) => {
                if( !unMounted ){
                    setMessages( oldMessages => [ message , ...oldMessages ] );
                }
            });
        }

        return () => {
            unMounted = true ;
            if( requestId !== "" ){
                Fire.shared.off();
            }
        }
    } , [  ] );

    function getRequiredUserDetails(){
        let userData = {} ;
        userData = {
            name: user.firstName+" "+user.lastName,
            _id: user.id,
            avatar: user.profileImage
        };
        return userData;
    }

    function renderBubble(props) {
        return (
            <View>
                <Bubble

                    {...props}

                    timeTextStyle={{
                        right: {
                            color: colors.white
                        },
                        left: {
                            color: colors.white
                        },
                    }}

                    textStyle={{
                        right: {
                            color: colors.white
                        },
                        left: {
                            color: colors.white
                        },
                    }}

                    wrapperStyle={{
                        left: {
                            backgroundColor:colors.primary,
                        },
                        right: {
                            backgroundColor: colors.primary,
                        }
                    }}

                />
                {
                    user.id !==  props.currentMessage.user._id ?
                        <Text style={{ fontSize:10 }}>{props.currentMessage.user.name}</Text>
                        : null
                }
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container} >

            {  Platform.OS === 'android' ?
                <View style={{flex:1}} behavior={"padding"} keyboardVerticalOffset={0} enabled >
                    <GiftedChat inverted={true} messages={ messages }
                                listViewProps={{
                                    backgroundColor: colors.secondaryTransparent

                                }}
                                renderBubble={renderBubble}
                                onSend={Fire.shared.send} user={getRequiredUserDetails()} />
                </View>
                : <GiftedChat inverted={true} messages={ messages  }
                              listViewProps={{
                                  backgroundColor: colors.secondaryTransparent
                              }}
                              renderBubble={renderBubble}
                              onSend={Fire.shared.send} user={getRequiredUserDetails()} />
            }

        </SafeAreaView>
    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
