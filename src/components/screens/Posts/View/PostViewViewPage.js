import React, {useContext, useState, useEffect} from "react";
import {Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform} from "react-native";
import colors from "../../../../colors/colors";
import {windowHeight, windowWidth} from "../../../../utils/Dimensions";
import {AuthContext} from "../../../navigation/AuthProvider";
import {useNavigation} from '@react-navigation/native';
import FlatListSlider from './../../../helper/Slider/FlatListSlider';
import postImage from "../../../../../assets/user-avatar.png";
import styled from 'styled-components/native'
import LoadableImage from "../../../../common/LoadableImage";
import IconButton from "../../../../common/IconButton";
import moment from "moment";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import API from "../../../../services/api";
import Loading from "../../../../common/Loading";
import UserIsPostOwnerMenu from "./UserIsPostOwnerMenu";
import UserIsNotPostOwnerMenu from "./UserIsNotPostOwnerMenu";


const StyledTextButton = styled.Text`
  color: palevioletred;
  background-color: transparent;
  font-size: 10px;
  margin: 5px 5px 5px 0;
  padding: 2.5px;
  border: 1px solid palevioletred;
  border-radius: 10px;
  width:100px;
  text-align:center;
  text-transform:capitalize;
  display: inline;
`

const StyledTextButton2 = styled(StyledTextButton)`
  width:150px;
`

function getWindowWidth( x , y ){
    // console.log( "windowWidth"  , windowWidth);
    let c = (( ( windowWidth-20) / x ) * y ) ;
    // console.log( "windowWidth c"  , c);
    return c;
}


export default function PostViewHome({route, dataProp, removeItem , key, dataKey}) {

    const navigation = useNavigation();

    const {user, logout} = useContext(AuthContext);
    const [data, setData] = useState(dataProp);

    const [postStatus, setPostStatus] = useState( dataProp.status );

    const [likes, setLikes] = useState(dataProp.totalLikes);
    const [liked, setLiked] = useState(dataProp.likedPost);

    const [saves, setSaves] = useState(dataProp.totalSaved);
    const [saved, setSaved] = useState(dataProp.savedPost);
    const [likeString, setLikeString] = useState(dataProp.likeString);

    const [likedInProcess, setLikedInProcess] = useState(false);
    const [saveInProgress, setSaveInProgress] = useState(false);

    const [requests, setRequests] = useState(dataProp.requests);
    const [request, setRequest] = useState(dataProp.request);
    const [acceptedRequest, setAcceptedRequest] = useState(dataProp.acceptedRequest);
    const [postDeleteInProcess, setPostDeleteInProcess] = useState(false);

    const [requestDecisionInProcess, setRequestDecisionInProcess] = useState(false);
    const [decisionInProcessId, setDecisionInProcessId] = useState("");

    useEffect(() => {
        let isUnMount = false;
        if (!isUnMount) {
        }
        return () => {
            isUnMount = true;
        }

    }, []);

    const screenWidth = Math.round(windowWidth);

    function getImagesArray() {
        let imageArray = [];
        data.postUploads.map(function (upload, index) {
            imageArray.push({
                image: upload,
                desc: data.title
            });
        });
        return imageArray;
    }

    async function likePost(id) {
        if (!likedInProcess) {
            setLikedInProcess(true);
            let returnedData = await API.Post.like(id);
            if (returnedData !== undefined && returnedData.success) {
                setLiked(returnedData.data.status);
                setLikes(returnedData.data.totalLikes);
                setLikeString(returnedData.data.likeString);
                setLikedInProcess(false);
            } else if (returnedData !== undefined && !returnedData.success) {
                if (returnedData.tokenExpired) {
                    logout();
                    setLikedInProcess(false);
                }
            }
        }
    }


    async function savePost(id) {
        if (!saveInProgress) {
            setSaveInProgress(true);
            let returnedData = await API.Post.save(id);
            if (returnedData !== undefined && returnedData.success) {
                setSaved(returnedData.data.status);
                setSaves(returnedData.data.totalSaved);
                setSaveInProgress( false );
            } else if (returnedData !== undefined && !returnedData.success) {
                if (returnedData.tokenExpired) {
                    logout();
                    setSaveInProgress( false );
                }
            }
        }
    }

    async function acceptRequest(id) {
        if (!requestDecisionInProcess && decisionInProcessId !== id ) {
            setRequestDecisionInProcess(true);
            setDecisionInProcessId( id );
            let returnedData = await API.Post.accept(id);
            if (returnedData !== undefined && returnedData.success) {
                setRequestDecisionInProcess(false);
                setDecisionInProcessId( "" );
                setAcceptedRequest( returnedData.data );
                setPostStatus(6);
            } else if (returnedData !== undefined && !returnedData.success) {
                setRequestDecisionInProcess(false);
                setDecisionInProcessId( "" );
                if (returnedData.tokenExpired) {
                    logout();
                }
            }
        }
    }

    async function declineRequest(id) {
        if (!requestDecisionInProcess  && decisionInProcessId !== id) {
            setRequestDecisionInProcess(true);
            setDecisionInProcessId( id );
            let returnedData = await API.Post.decline(id);
            if (returnedData !== undefined && returnedData.success) {
                setRequestDecisionInProcess(false);
                setDecisionInProcessId( "" );

                let newRequests = [] ;
                for( let request of requests ){
                    if( request.id !== id ){
                        newRequests.push( request );
                    }
                }
                setRequests( newRequests );

            } else if (returnedData !== undefined && !returnedData.success) {
                setRequestDecisionInProcess(false);
                setDecisionInProcessId( "" );
                if (returnedData.tokenExpired) {
                    logout();
                }
            }
        }
    }

    async function editPost(data){
        let postUploads = data.postUploads;

        let newUploads = [] ;
        for (let upload in postUploads){
            newUploads.push( { key:  postUploads[upload].replace('https://altruist-project.s3.us-west-2.amazonaws.com/','') , objectUrl:postUploads[upload] } );
        }

        navigation.navigate(
            'CreatePost' , {
                screen :'PostTypeSelection',
                params : {

                    idProp: data.id,
                    postTypeIdProp: data.postType.id,
                    postCategoryIdProp: data.postCategory.id,

                    titleProp: data.title,
                    descriptionProp: data.description,
                    cityNameProp: data.city_name,
                    latProp: data.post_location.lat,
                    langProp: data.post_location.lang,

                    uploadsObjProp: newUploads

                }
            });
    }

    async function deletePost( id ){
        console.log( postDeleteInProcess );
        if( !postDeleteInProcess ){
            setPostDeleteInProcess( true );
            let returnedData = await API.Post.delete(id);
            console.log( returnedData );
            if (returnedData !== undefined && returnedData.success) {
                console.log( returnedData );
                setPostDeleteInProcess( false );
                removeItem( id );
            } else if (returnedData !== undefined && !returnedData.success) {
                setPostDeleteInProcess( false );
                if (returnedData.tokenExpired) {
                    logout();
                }
            }
        }
    }

    return (
        <View
            style={[styles.container, {backgroundColor: dataKey % 2 === 0 ? colors.primaryTransparent : colors.secondaryTransparent}

            ]}>

            { postDeleteInProcess ?
                <View style={styles.absoluteCenterLoader} >
                    <Loading />
                </View>
                : null
            }

            <View style={styles.userContainer}>
                <View style={styles.userPicContainer}>
                    {
                        data.user.profile_picture ?
                            <LoadableImage
                                source={{uri: data.user.profile_picture}}
                                styleData={{width: 40, height: 40, borderRadius: 20}}/>
                            :
                            <LoadableImage
                                source={postImage} styleData={{width: 40, height: 40, borderRadius: 20}}/>
                    }
                </View>
                <View style={{flex: 1}}>
                    <Text style={styles.userName}>{data.user.fullName}</Text>
                    <Text style={{...styles.locationLabel, textAlign: "left", fontSize: 8}}>{data.city_name}</Text>
                    <Text style={{...styles.locationLabel, textAlign: "left", fontSize: 8}}>{moment.unix( data.created_at ).fromNow() }</Text>
                </View>

                {!user.isSignout && user.id === data.user.id ?
                    <View style={styles.headerButtonContainer}>
                        <TouchableOpacity onPress={() => {
                            editPost(data)
                        }}>
                            <MaterialIcons style={styles.bottomButtonContainerIcon} name={"edit"}
                                                    size={25} color={colors.primary}/>
                        </TouchableOpacity>
                    </View>
                    : null}

                {!user.isSignout && user.id === data.user.id ?
                    <View style={styles.headerButtonContainer}>
                        <TouchableOpacity onPress={() => {
                            deletePost(data.id)
                        }}>
                            <Ionicons style={styles.bottomButtonContainerIcon} name={"ios-trash"} size={25}
                                      color={colors.primary}/>
                        </TouchableOpacity>
                    </View>
                    : null}

                {!user.isSignout ?
                    <View style={styles.headerButtonContainer}>
                        {saved ?
                            <View style={styles.innerFlexContainer}>
                                <TouchableOpacity onPress={() => {
                                    savePost(data.id)
                                }}>
                                    <Image
                                        source={
                                            require('../../../../../assets/Icons_svg/Icons_Altruist_Tag.png')
                                        }
                                        style={{
                                            width: 20,
                                            height: 20,
                                            marginRight:10,
                                            marginLeft:5,
                                            marginTop:10
                                        }}
                                    />
                                </TouchableOpacity>
                                <Text style={{ ...styles.innerFlexContainerText , fontSize:18 }}>{saves > 0 ? saves : null}</Text>
                            </View>
                            :
                            <View style={styles.innerFlexContainer}>
                                <TouchableOpacity onPress={() => {
                                    savePost(data.id)
                                }}>
                                    <Image
                                        source={
                                            require('../../../../../assets/Icons_svg/Icons_Altruist_Tag.png')
                                        }
                                        style={{
                                            width: 20,
                                            height: 20,
                                            marginRight:10,
                                            marginLeft:5,
                                            marginTop: Platform.OS === 'ios'  ? 0 : 10
                                        }}
                                    />
                                </TouchableOpacity>
                                <Text style={{ ...styles.innerFlexContainerText , fontSize:18 }}>{saves > 0 ? saves : null}</Text>
                            </View>
                        }
                    </View> : null}


            </View>

            <TouchableOpacity
                style={{ minHeight:350 }}
                onPress={() => {
                navigation.navigate('SingleHelpScreen', { postId: data.id, postTitle: data.title })
            }}>


                <View style={{...styles.tagsContainer, paddingRight: 20}}>
                    <Text
                        style={{...styles.tag}}>{data.postType.title === "Help Needed" ? "wants help" : "want to help"}</Text>
                    <Text style={{...styles.tag}}>{data.postCategory.title}</Text>
                </View>


                <View style={styles.containerReview}>

                    <Text style={{
                        ...styles.textColour,
                        textAlign: "left",
                        marginBottom: 10,
                        fontWeight: "bold"
                    }}>{data.title}</Text>
                    <Text style={{
                        ...styles.containerReviewHeader,
                        textAlign: "left",
                        marginBottom: 10,
                        fontSize: 14,
                        paddingRight: 20
                    }}>{data.description}</Text>

                </View>

                <View styles={{flex:1,display: "flex",width: windowWidth-20}} >
                    {getImagesArray().length > 0 ? (getImagesArray().length > 1 ?
                        <FlatListSlider
                            style={
                                {
                                    width: windowWidth
                                }
                            }
                            data={getImagesArray()}
                            timer={100}
                            imageKey={'image'}
                            local={false}
                            width={screenWidth}
                            separator={0}
                            loop={false}
                            autoscroll={false}
                            currentIndexCallback={index =>  console.log('Index', index)}
                            indicator
                            animation
                        />
                        :
                        <LoadableImage
                            styleData={[imageStyles.image, {width: windowWidth-20}]}
                            source={{uri: getImagesArray()[0]['image']}}
                        />) : null
                    }
                </View>

            </TouchableOpacity>

            {!user.isSignout ?
                <View style={styles.bottomButtonContainer}>
                    <View style={{ ...styles.innerFlexContainer , width: getWindowWidth( 5 , 2.4 ) }}>
                        {liked ?
                            <View style={styles.innerFlexContainer}>
                                <TouchableOpacity onPress={() => {
                                    likePost(data.id)
                                }}>
                                    <Ionicons style={styles.bottomButtonContainerIcon} name={"ios-heart"} size={25}
                                              color={colors.primary}/>
                                </TouchableOpacity>
                                <Text style={styles.innerFlexContainerText}>{likeString}</Text>
                            </View>
                            :
                            <View style={styles.innerFlexContainer}>
                                <TouchableOpacity onPress={() => {
                                    likePost(data.id)
                                }}>
                                    <Ionicons style={styles.bottomButtonContainerIcon} name={"ios-heart-empty"}
                                              size={25} color={colors.primary}/>
                                </TouchableOpacity>
                                <Text style={styles.innerFlexContainerText}>{likeString}</Text>
                            </View>
                        }
                    </View>
                    { postStatus === 1 ?
                        <View style={styles.innerFlexContainer}>
                            {
                                user.id === data.user.id ?
                                    <UserIsPostOwnerMenu dataProp={data} requestsProp={requests} />
                                    :
                                    <UserIsNotPostOwnerMenu dataProp={data} requestProp={data.request} />

                            }
                        </View> : null
                    }

                </View> : null}

            {!user.isSignout && requests.length > 0 && postStatus === 1  ?
                <View>
                    {requests.map(function (requestsItem, index) {
                        // console.log( requestsItem );
                        return (
                            <View style={styles.requestContainerParent}  key={index}>

                                { requestDecisionInProcess && decisionInProcessId === requestsItem.id ?
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
                                    <View style={{ ...styles.innerFlexContainer , flexWrap: "wrap" , width :  (  ((windowWidth - 20)/5)*4  )  }}>
                                        <Text >{requestsItem.text}</Text>
                                    </View>
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
                                </View>
                            </View>
                        )
                    })}
                </View>
                : null}

            {!user.isSignout && postStatus === 6 && acceptedRequest !== null ?
                <View style={styles.requestContainerParent}  >

                    <View style={{ ...styles.userContainer , marginBottom:0 }} >
                        <View style={{ ...styles.userPicContainer , width: 25,
                            height: 20,
                            borderRadius: 12 }}>
                            <View style={styles.userContainer}>
                                <View style={{ ...styles.userPicContainer,   width: 20,
                                    height: 20,
                                    borderRadius: 12 }}>
                                    {
                                        acceptedRequest.user.profile_picture ?
                                            <LoadableImage
                                                source={{uri: acceptedRequest.user.profile_picture}}
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
                                {acceptedRequest.user.fullName}
                            </Text>
                            <Text style={{...styles.locationLabel, textAlign: "left", fontSize: 8}}>{moment.unix( acceptedRequest.created_at ).fromNow() }</Text>
                        </View>
                        <View style={{ ...styles.innerFlexContainer , alignSelf: "flex-end"}}>
                            <View style={{...styles.tagsContainer2 , padding: 5 , paddingTop:0, marginTop:0 }}>
                                <Text style={{...styles.tag , fontSize: 8,
                                    borderColor: colors.success,
                                    color: colors.success,
                                    marginRight: 5,
                                    padding: 4,
                                    borderRadius: 3 }}>Accepted</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ ...styles.bottomRequestContainer, justifyContent: "space-between" }} >
                        <View style={{ ...styles.innerFlexContainer , flexWrap: "wrap" }}>

                            <View style={{ ...styles.requestContainerParent , marginLeft:50, borderWidth:2,  borderTopColor: colors.primary, borderColor: colors.primary, marginTop:10 ,  borderRadius: 10 , padding:10 , paddingTop: 10,
                                paddingBottom: 10 , paddingLeft:10, paddingRight:10 }}  >
                                <View style={{ ...styles.userContainer , marginBottom:0 }} >
                                    <View style={{ ...styles.userPicContainer , width: 25,
                                        height: 20,
                                        borderRadius: 12 }}>
                                        <View style={styles.userContainer}>
                                            <View style={{ ...styles.userPicContainer,   width: 20,
                                                height: 20,
                                                borderRadius: 12 }}>
                                                {
                                                    acceptedRequest.request.user.profile_picture ?
                                                        <LoadableImage
                                                            source={{uri: acceptedRequest.request.user.profile_picture}}
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
                                            {acceptedRequest.request.user.fullName}
                                        </Text>
                                        <Text style={{...styles.locationLabel, textAlign: "left", fontSize: 8}}>{moment.unix( acceptedRequest.request.created_at ).fromNow() }</Text>
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
                                    <View style={{ ...styles.innerFlexContainer , flexWrap: "wrap" }}>
                                        <Text >{acceptedRequest.request.text}</Text>
                                    </View>
                                </View>
                            </View>


                        </View>
                    </View>
                </View>
                : null
            }




        </View>
    )
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
        marginBottom:10,
        flexDirection: "row",
        flexWrap: "nowrap",
        justifyContent: "space-between"
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

    bottomRequestContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        paddingTop: 5,
        paddingBottom: 5,
    },

    headerButtonContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
        alignSelf: "flex-end",
        paddingLeft:3,
        paddingRight:3
    },

    innerFlexContainer: {
        display: "flex",
        flexDirection: "row",
        flexWrap: "nowrap",
    },

    tagsContainer: {
        display: "flex",
        marginTop: 10,
        flexDirection: "row",
        flexWrap: "nowrap"
    },

    tagsContainer2: {
        display: "flex",
        marginTop:4,
        flexDirection: "row",
        flexWrap: "nowrap"
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
        position: "relative",
        width: windowWidth
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
    imgContainer: {
        flexBasis: "100%",
        flex: 1,
        height: 170,
        backgroundColor: colors.white,
        textAlign: "center",
        marginBottom: 20,
        marginTop: 20,
        justifyContent: "flex-start",
        alignItems: "center",
        alignSelf: "center",
    },
    imgContainerSmall: {
        flexBasis: "100%",
        flex: 1,
        height: 50,
        marginTop: 20,
        backgroundColor: colors.white,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
    },
    catBox: {
        flexBasis: "100%",
        backgroundColor: colors.white,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        textAlign: "center",
    },
    textColour: {
        fontSize: 16,
        fontWeight: "bold",
        justifyContent: "center",
        alignItems: "center",
        color: colors.black,
        textAlign: "center",
    },
    userName: {
        fontSize: 16,
        fontWeight: "bold",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        color: colors.black,
        textAlign: "left",
        marginTop: 0
    },
    textColour2: {
        marginTop: 10,
        marginLeft: 20,
        fontSize: 20,
        color: colors.black,
        textAlign: "left",
        width: windowWidth
    },
    errorLabel: {
        marginLeft: 0,
        fontSize: 16,
        color: "rgb(232, 155, 141)",
        textAlign: "left"
    },
    input: {
        padding: 15,
        marginBottom: 10,
        marginLeft: 20,
        marginTop: 20,
        width: windowWidth,
        fontSize: 16,
        borderRadius: 8,
        borderColor: colors.black,
        borderWidth: 1,
    },
    img2: {
        borderRadius: 20,
        width: "100%",
        height: 250
    },
    catBox2: {
        height: 350,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: "center",
        marginBottom: 15,
        overflow: 'hidden'
    },
    imgContainer2: {
        borderRadius: 20,
        width: windowWidth,
        margin: 10,
        height: 250,
        borderWidth: 0,
        backgroundColor: colors.white,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "flex-start",
    },

});

const imageStyles = StyleSheet.create({
    container: {
        width: windowWidth,
        position: 'relative',
        height: 230
    },
    image: {
        height: 230,
        width: windowWidth - 20,
        resizeMode: 'stretch',
    },
});