import React, {useState, useEffect, useContext} from "react";
import {Image, Button, StyleSheet, Text, View, TouchableOpacity} from "react-native";
import FormButton from "../../../../common/FormButton";
import colors from "../../../../colors/colors";
import BR from "../../../helper/BR";
import API from "../../../../services/api";
import logo from "../../../../../assets/icon.png";
import Ionicons from "react-native-vector-icons/Ionicons";
import AsyncStorageHelper from "../../../../services/AsyncStorageHelper";
import {windowHeight} from "../../../../utils/Dimensions";
import {AuthContext} from "../../../navigation/AuthProvider";

const PostCategorySelection = ({navigation, route }) => {

    const {user, logout} = useContext(AuthContext);

    const [catList, setCatList] = useState([]);
    const [postTypeId, setPostTypeId] = useState( route.params.postTypeIdProp );

    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight : () => <Text/>,
            headerLeft: () => (
                <View style={{
                    left:20
                }}
                >
                    <TouchableOpacity
                        onPress={() =>
                        {
                            navigation.navigate( "PostTypeSelection" )
                        }
                        }
                    >
                        <Ionicons name='md-arrow-back' color={"white"} size={32} />
                    </TouchableOpacity>
                </View>
            ),
        });
    }, [navigation]);

    async function getCatList( ){
        let list = await AsyncStorageHelper.getCatList();
        console.log( "list" , list);
        if( Array.isArray( list ) ){
            setCatList( list );
        }else{
            let catListData = await API.PostCategories.list();
            if( catListData.success === true ){
                console.log( catListData.data );
                setCatList( catListData.data );
                AsyncStorageHelper.setObjectValue( 'catList' ,catListData.data );
            }else if (  catListData.success === false && catListData.tokenExpired === true  ){
                logout();
            }
        }
    }

    useEffect(() => {

        let isUnMount = false;
        if( !isUnMount  ){
            getCatList();
        }
        return () => {
            isUnMount = true ;
        }

    } , [] );

    return (
        <View style={styles.container}>
            { catList.map( function ( cat ) {
                return (
                    <TouchableOpacity style={styles.catBox}  onPress={
                        ( event ) =>  navigation.navigate( "PostDataForm" , { postTypeIdProp: postTypeId , postCategoryIdProp: cat.id } )
                    }   key={cat.key}  >
                        <View style={styles.imgContainer} >
                            <Image source={{uri:cat.s3_path}} style={{width: 100, height: 100}}/>
                            <BR/>
                            <Text style={styles.textColour} >{cat.title}</Text>
                        </View>
                    </TouchableOpacity>
                 )
            } ) }
        </View>
    )
}

export default PostCategorySelection;

const styles = StyleSheet.create({
    headerViewText:{
        color:"white",
        fontSize:18,
        fontWeight:"bold",
    },
    headerView: {
        backgroundColor: "rgb(232, 155, 141)",
        minHeight:50,
        display:"flex",
        alignItems: "center",
        justifyContent: "center",
        flexBasis: "100%",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "flex-start",
        justifyContent: "center",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap"
    },
    catBox: {
        flexBasis: "33%",
        backgroundColor: colors.white,
        alignItems: "center",
        justifyContent: "center",
    },
    textColour: {
        fontSize: 14,
        fontWeight: "bold",
        justifyContent: "center",
        alignItems: "center",
        color: "rgb(232, 155, 141)",
        textAlign: "center",
    },
    imgContainer: {
        flex: 1,
        height: windowHeight/4,
        backgroundColor: colors.white,
        justifyContent: "center",
        textAlign: "center",
        marginTop: 20,
        marginBottom: 20,
        alignItems: "center",

        alignSelf:"center",
    },
});
