import React, {useState, useEffect} from "react"
import {StyleSheet, Text, View, Image, FlatList} from "react-native"
import Loading from "../../../../common/Loading";
import API from "../../../../services/api"
import {windowWidth} from "../../../../utils/Dimensions";
import COLORS from "../../../../colors/colors"


import postImage from "../../../../../assets/user-avatar.png";


export default function TopHelpers() {

    const [topHelper, setTopHelper] = useState([])
    const [isLoading, setLoading] = useState(true);


    useEffect( () => {
        let isUnMount = false
        if (!isUnMount) {
            async function loadPost(){
                let P = await API.topHelper()
                if( !isUnMount ){
                    if (P !== undefined && P.success) {
                        setTopHelper(P.data)
                        setLoading(false)
                    }else{
                        setTopHelper([])
                        setLoading(false)
                    }
                }
            }
            loadPost()
        }
        return () => {
            isUnMount = true
        }
    }, [])

    const DATA = topHelper.map((user) => ({
        name: user.firstName + " " + user.lastName,
        image: user.profile_picture,
        college: user.college,
        helpCounts: user.helps_provided
    }))

    return (
        <View>
            <View style={styles.slider}>
                <Text style={styles.mainHeading}>Top Helper's</Text>
                {
                    isLoading ? <Loading/> : (
                        <FlatList
                            horizontal
                            data={DATA}
                            keyExtractor={ ( item , index ) => index.toString() }
                            renderItem={({item, index}) => (
                                <View style={styles.card} key={index}>
                                    <Text style={styles.name}>{item.name}</Text>
                                    {item.image ?
                                        <Image source={{uri: item.image}} style={styles.image}/>
                                        : <Image source={postImage} style={styles.image}/>
                                    }
                                    <Text style={styles.collegeName}>Student at {item.college}</Text>
                                </View>
                            )}
                        />
                    )
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    slider: {
        backgroundColor: COLORS.secondary,
    },
    mainHeading: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginLeft: windowWidth / 20,
        marginTop: 5,
        marginBottom: 5,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    collegeName: {
        fontSize: 14,
        textAlign: 'left',
        width: windowWidth / 2,
    },
    card: {
        paddingTop: 5,
        paddingStart: windowWidth / 20,
        paddingEnd: windowWidth / 20,
    },
    image: {
        width: windowWidth / 2,
        height: windowWidth / 2.5,
        resizeMode: 'cover',
        borderRadius: 8,
        marginTop: 6,
        marginBottom: 6,
    }
})