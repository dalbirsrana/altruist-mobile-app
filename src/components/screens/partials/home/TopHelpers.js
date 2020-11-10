import React, {useState, useEffect} from "react"
import { StyleSheet, Text, View, Image, FlatList } from "react-native"
import Loading from "../../../../common/Loading";
import API from "../../../../services/api"
import { windowWidth } from "../../../../utils/Dimensions";
import COLORS from "../../../../colors/colors"

export default function TopHelpers(){

    const [topHelper, setTopHelper] = useState([])
    const [isLoading, setLoading] = useState(true);

    const loadPost = async () => {
        let P = await API.topHelper()
        if (P !== undefined && P.success) {
            setTopHelper(P.data)
            setLoading(false)
        }
    }

    useEffect(()=>{
        let isUnMount = false
        if (!isUnMount) {
            loadPost()
        }
        return ()=>{
            isUnMount = true
        }
    }, [])

    const DATA = topHelper.map((user)=>({
            name: user.firstName,
            image: user.profile_picture,
            college: user.college,
            helpCounts: user.helps_provided
    }))

    return (
        <View>
            <Text style={styles.mainHeading}>Top Helper's</Text>
            <View style={styles.slider}>
            {
                isLoading ? <Loading /> : (
                    <FlatList
                        horizontal
                        data={DATA}
                        renderItem={({item, index})=>(
                            <View style={styles.card}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Image source={{uri:item.image}} style={styles.image} />
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
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginLeft: windowWidth/20,
        marginTop: 5,
        marginBottom: 5,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    collegeName: {
        fontSize: 14,
        textAlign: 'center',
    },
    card: {
        paddingTop: 5,
        paddingBottom: 5,
        paddingStart: windowWidth/20,
        paddingEnd: windowWidth/20,
    },
    image: {
        width: windowWidth/2,
        height: windowWidth/2.5,
        resizeMode: 'cover',
        borderRadius: 8,
        marginTop: 6,
        marginBottom: 6,
    }
})