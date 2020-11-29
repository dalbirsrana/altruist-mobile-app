import React, {useContext, useState} from 'react'
import {RefreshControl, StyleSheet, Text, TouchableOpacity, View, VirtualizedList} from 'react-native'
import API from "../../../services/api"
import {windowHeight, windowWidth} from '../../../utils/Dimensions';
import color from '../../../colors/colors'
import colors from '../../../colors/colors'
import {AuthContext} from "../../navigation/AuthProvider";
import Ionicons from "react-native-vector-icons/Ionicons";
import Item from "./ChatListItem";

const ChatList = ({navigation}) => {

    const {user, logout} = useContext(AuthContext);

    const [chats, setChats] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const loadchats = async () => {
        let N = await API.User.getChatList()
        if (N !== undefined && N.success) {
            setLoading(false)
            setChats(N.data)
        } else if (N !== undefined && !N.success) {
            setLoading(false)
            if (N.tokenExpired) {
                logout();
            }
        }
    }

    //Rerender screen on tab press
    React.useEffect(() => {
        let isUnMount = false;
        if (!isUnMount) {
            loadchats();
        }
        return () => {
            isUnMount = true;
        }
    }, []);

    const popOutChat = ( requestId ) => {
        let newChatList = [];
        let newOrderedChatList = [];

        let updatedChatItem = [] ;
        chats.map(function (item , index){
            if( requestId !== item.id ){
                item.newMessageArrived = false;
                newChatList.push( item );
            }else{
                item.newMessageArrived = true;
                newOrderedChatList.push(item) ;
            }
        });

        newChatList.map(function (item , index){
            newOrderedChatList.push(item) ;
        });

        setChats( newOrderedChatList );
    }

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <Text/>,
            headerLeft: () => (
                <View style={{
                    left: 20
                }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate('HomeStack')
                        }
                        }
                    >
                        <Ionicons name='md-arrow-back' color={"white"} size={32}/>
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);


    return (
        <VirtualizedList

            refreshControl={
                <RefreshControl refreshing={isLoading} onRefresh={() => {
                    setChats([]);
                    loadchats();
                }}/>
            }
            data={chats}
            renderItem={({item, index}) => (
                <Item index={index} post={item} navigation={navigation} popOutChat={popOutChat} />
            )}
            keyExtractor={item => item.id.toString()}
            getItemCount={(data) => data.length}
            getItem={(data, index) => data[index]}
        />
    )
}

export default ChatList;


const styles = StyleSheet.create({

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
    }
});

