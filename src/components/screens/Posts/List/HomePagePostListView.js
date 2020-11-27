import React, {useContext, useEffect, useState} from 'react'
import {RefreshControl, ScrollView, Text, View, VirtualizedList, FlatList, SafeAreaView} from 'react-native'
import Loading from "../../../../common/Loading";
import PostViewHome from "../View/PostViewHome";
import API from "../../../../services/api";
import {AuthContext} from "../../../navigation/AuthProvider";
import FormButton from "../../../../common/FormButton";
import InverseButton from "../../../../common/InverseButton";
import HomePageTopSlider from "../../../helper/HomePageTopSlider/HomePageTopSlider";
import TopHelper from "../../partials/home/TopHelpers";

function compare( a, b ) {
    if ( a.id < b.id ){
        return -1;
    }
    if ( a.id > b.id ){
        return 1;
    }
    return 0;
}

const Item = ({ index , post , removeItem })=> {
    return (
        <View key={index} style={{flex:1}}  >
            <PostViewHome dataKey={index} dataProp={post} removeItem={(id)=>removeItem(id)} />
        </View>
    );
}

function renderBody( navigation ){
    return (
            <View style={{flex:1}}>
                {/* Slider container */}
                <HomePageTopSlider navigation={navigation} />

                {/* Top Helper container */}
                <TopHelper />
            </View>
    );
}

const HomePagePostListView = ( {navigation , askComponentToLoadMorePostsProp , loadinIsFinished , postCreatedId  } ) =>{

    const {user, logout} = useContext(AuthContext);

    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [loadinPostsIsInProgress, setLoadinPostsIsInProgress] = useState(false);
    const [askComponentToLoadMorePosts, setAskComponentToLoadMorePosts] = useState( askComponentToLoadMorePostsProp );
    const [posLoadingFinished, setPosLoadingFinished] = useState( false );

    const [appendingPostsProcess, setAppendingPostsInProgress] = useState( false );

    const addLoadedPosts = async ( postsData ) =>  {

        let tempPostArray = postsData.data ;
        // removing duplicates
        let newPosts = Object.values(tempPostArray.reduce((acc,cur)=>Object.assign(acc,{[cur.id]:cur}),{}))

        setPosts( newPosts.reverse() );
        setAskComponentToLoadMorePosts( false )
        setPosLoadingFinished( true )
        setLoadinPostsIsInProgress( false );

        // console.log( "loadinIsFinished" );
        loadinIsFinished();
        return true;
    }

    const prependPosts = async ( postsData ) =>  {

        let tempPostArray = postsData.data ;
        for( let post of posts ){
            tempPostArray.push( post );
        }

        // console.log( "tempPostArray" , tempPostArray.length );

        // removing duplicates
        let newPosts = Object.values(tempPostArray.reduce((acc,cur)=>Object.assign(acc,{[cur.id]:cur}),{}))

        for( let post of newPosts ){
            // console.log( 'Post Id' ,post.id ,post.title );
        }

        setPosts( newPosts.reverse() );
        setAskComponentToLoadMorePosts( false )
        setPosLoadingFinished( true )
        setLoadinPostsIsInProgress( false );

        // console.log( "loadinIsFinished" );
        loadinIsFinished();
        return true;
    }

    const appendPosts = async ( postsData ) =>  {

        let tempPostArray = posts ;
        for( let post of postsData.data ){
            tempPostArray.push( post );
        }

        // console.log( "tempPostArray" , tempPostArray.length );

        // removing duplicates
        let newPosts = Object.values(tempPostArray.reduce((acc,cur)=>Object.assign(acc,{[cur.id]:cur}),{}))

        for( let post of newPosts ){
            // console.log( 'Post Id' ,post.id ,post.title );
        }

        setPosts( newPosts.reverse() );

        setAppendingPostsInProgress(false)
        return true;
    }

    const loadPost = async () => {
        setLoadinPostsIsInProgress( true );
        let postsData = await API.Post.list();
        if (postsData !== undefined && postsData.success ) {
            setLoading(false)
            addLoadedPosts( postsData );
        }else if( postsData !== undefined && !postsData.success ){
            if( postsData.tokenExpired ){
                logout();
            }
        }
    }

    const addPost = async () => {
        // console.log("addPost");
        setLoadinPostsIsInProgress( true );
        let postsData = await API.Post.view();
        if (postsData !== undefined && postsData.success ) {
            setLoading(false)
            prependPosts( [postsData] );
        }else if( postsData !== undefined && !postsData.success ){
            if( postsData.tokenExpired ){
                logout();
            }
        }
    }

    useEffect(() => {

        console.log('page load');
        let isUnMount = false;
        if (!isUnMount){
            if( !loadinPostsIsInProgress ){
                // console.log('Asked to lad more posts');
                loadPost();
            }
        }
        return () => {
            isUnMount = true;
        }

    } , [ askComponentToLoadMorePostsProp , postCreatedId  ] );

    const getItem = ( data , index) => {
        return data[ index ];
    }

    const getItemCount = ( data ) => {
        return data.length;
    }

    const removeItem = ( id ) => {
        let tempPosts = [] ;
        for( let post of posts ){
            if( post.id !== id ){
                tempPosts.push( post );
            }
        }
        setPosts( tempPosts );
    }

    const loadMorePosts = async () => {
        if( !appendingPostsProcess && posts.length > 0){
            let lastPostId = posts[ posts.length-1 ].id ;
            setAppendingPostsInProgress( true );
            let postsData = await API.Post.list( lastPostId );
            if (postsData !== undefined && postsData.success ) {
                setLoading(false)
                appendPosts( postsData );
            }else if( postsData !== undefined && !postsData.success ){
                if( postsData.tokenExpired ){
                    logout();
                }
            }
        }
    }

    return (
        <SafeAreaView style={{flex:1}} >
            {
                isLoading
                    ?
                    <Loading />
                    :
                    (
                        <FlatList
                            ListHeaderComponentStyle={{flex:1}}
                            ListHeaderComponent={renderBody( navigation )}

                            refreshControl={
                                <RefreshControl refreshing={isLoading} onRefresh={()=>{
                                    loadPost();
                                }} />
                            }

                            data={posts}
                            renderItem={({ item, index }) => <Item index={index} post={item} removeItem={(id)=>removeItem(id)} />}
                            keyExtractor={item => item.id.toString()}
                            ListFooterComponent=            {
                                isLoading ? null :
                                    <View style={{display: "flex"}} >
                                        {  appendingPostsProcess ?
                                            <Loading />
                                            :
                                            <View style={{display: "flex", justifyContent:"center", marginBottom: 30 }} >
                                                <InverseButton onPress={() =>loadMorePosts()} buttonTitle={"Load More"}
                                                               iconName={"add-circle"}/>
                                            </View>
                                        }
                                    </View>
                            }


                        />
                    )
            }


        </SafeAreaView>

    )
}

export default HomePagePostListView;
