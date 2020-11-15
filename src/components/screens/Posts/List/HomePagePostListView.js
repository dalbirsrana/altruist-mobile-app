import React, {useContext, useEffect, useState} from 'react'
import {ScrollView, Text, View, VirtualizedList} from 'react-native'
import Loading from "../../../../common/Loading";
import PostViewHome from "../View/PostViewHome";
import API from "../../../../services/api";
import {AuthContext} from "../../../navigation/AuthProvider";
import FormButton from "../../../../common/FormButton";
import InverseButton from "../../../../common/InverseButton";

function compare( a, b ) {
    if ( a.id < b.id ){
        return -1;
    }
    if ( a.id > b.id ){
        return 1;
    }
    return 0;
}

const Item = ({ index , post })=> {
    return (
        <View key={index} style={{flex:1}}  >
            <PostViewHome dataKey={index} dataProp={post} />
        </View>
    );
}

const HomePagePostListView = ( {navigation , askComponentToLoadMorePostsProp , loadinIsFinished , postCreatedId } ) =>{

    const {user, logout} = useContext(AuthContext);

    const [posts, setPosts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [loadinPostsIsInProgress, setLoadinPostsIsInProgress] = useState(false);
    const [askComponentToLoadMorePosts, setAskComponentToLoadMorePosts] = useState( askComponentToLoadMorePostsProp );
    const [posLoadingFinished, setPosLoadingFinished] = useState( false );

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
    
    const loadPost = async () => {
        setLoadinPostsIsInProgress( true );
        let postsData = await API.Post.list();
        if (postsData !== undefined && postsData.success ) {
            setLoading(false)
            prependPosts( postsData );
        }else if( postsData !== undefined && !postsData.success ){
            if( postsData.tokenExpired ){
                logout();
            }
        }
    }

    const addPost = async () => {
        console.log("addPost");
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

        if( !loadinPostsIsInProgress ){
            console.log('Asked to lad more posts');
            loadPost();
        }

        // if( postCreatedId ){
        //     console.log("postCreatedId", postCreatedId);
        //     addPost( postCreatedId )
        // }

    } , [ askComponentToLoadMorePostsProp , postCreatedId  ] );

    const getItem = ( data , index) => {
        return data[ index ];
    }

    const getItemCount = ( data ) => {
        return data.length;
    }

    const loadMorePosts = () => {

    }

    return (
        <View style={{marginTop:10}} >
            {
                isLoading
                    ?
                    <Loading />
                    :
                    (
                        <VirtualizedList
                            data={posts}
                            initialNumToRender={1}
                            renderItem={({ item, index }) => <Item index={index} post={item} />}
                            keyExtractor={item => item.id.toString()}
                            getItemCount={getItemCount}
                            getItem={getItem}
                        />
                    )
            }

            <InverseButton onPress={() => loadMorePosts()} buttonTitle={"Load More"}
                           iconName={"edit-location"}/>

        </View>

    )
}

export default HomePagePostListView;
