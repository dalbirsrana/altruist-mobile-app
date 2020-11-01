import React, {createContext, useReducer, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import API from '../../services/api';
import AsyncStorageHelper from "../../services/AsyncStorageHelper";

/**
 * This provider is created
 * to access user in whole app
 */

export const AuthContext = createContext({});

export const AuthProvider = ({children , navigation}) => {

    let newLogOutMessage = false ;

    const [user, dispatch] = useReducer(
        (prevState, ...actions) => {
            if( typeof actions !== "undefined" && Array.isArray( actions ) && actions.length > 0 && typeof actions[0] !== "undefined" ){
                let action = actions[0];
                switch (action.type) {
                    case 'RESTORE_TOKEN':
                        return {
                            ...prevState,
                            token: action.token,
                            id: action.id,
                            username: action.username,
                            firstName: action.firstName,
                            lastName: action.lastName,
                            email: action.email,
                            phone: action.phone,
                            profileImage: action.profile_picture,
                            isLoading: false,
                            isSignout: false,
                            logoutMsg:false
                        };
                    case 'SIGN_IN':
                        return {
                            ...prevState,
                            isSignout: false,
                            token: action.token,
                            id: action.id,
                            username: action.username,
                            firstName: action.firstName,
                            lastName: action.lastName,
                            email: action.email,
                            phone: action.phone,
                            profileImage: action.profile_picture,
                            logoutMsg:false
                        };
                    case 'SIGN_OUT':
                        return {
                            ...prevState,
                            isSignout: true,
                            token: null,
                            id: null,
                            username: null,
                            firstName: null,
                            lastName: null,
                            email: null,
                            phone: null,
                            profileImage: null,
                            logoutMsg:newLogOutMessage
                        };
                }
            }
        },
        {
            isLoading: true,
            isSignout: true,
            token: null,
            id: null,
            username: null,
            firstName: null,
            lastName: null,
            email: null,
            phone: null,
            profileImage: null,
            logoutMsg: newLogOutMessage
        }
    );


    useEffect(() => {
        const bootstrapAsync = async () => {
            let signIn;
            try {
                //userToken = await AsyncStorage.getItem('userToken');
                signIn = await AsyncStorageHelper.getMyObject('user');
                // console.log( signIn );

                if (typeof signIn !== "undefined" && signIn.hasOwnProperty('success') && signIn.success === true ) {

                    let validateToken = signIn;
                    //Validate the userToken before restore
                    //let validateToken = await API.validateToken( { username: signIn.data.email , token : signIn.data.token } );
                    // console.log( validateToken );
                    if( validateToken.success ){
                        //dispatch({ type: 'RESTORE_TOKEN', token: userToken });
                        dispatch({
                            type: 'RESTORE_TOKEN',
                            isSignout: false,
                            token: validateToken.data.token,
                            id: validateToken.data.id,
                            username: validateToken.data.username,
                            firstName: validateToken.data.firstName,
                            lastName: validateToken.data.lastName,
                            email: validateToken.data.email,
                            phone: validateToken.data.phone,
                            profileImage: validateToken.data.profile_picture
                        })

                        console.log( "RESTORE_TOKEN" );
                        newLogOutMessage = "" ;
                        await AsyncStorageHelper.setObjectValue('user',validateToken)
                    }else{
                        newLogOutMessage = "Token has been expired. Please re-login!";
                        dispatch({
                            type: 'SIGN_OUT',
                            token: null,
                            id: null,
                            username: null,
                            firstName: null,
                            lastName: null,
                            email: null,
                            phone: null,
                            profileImage: null,
                            isSignout: true,
                            logoutMsg: newLogOutMessage
                        });
                    }
                }

            } catch (e) {
            }
        }

        bootstrapAsync();
    }, []);

// AsyncStorage.setItem(item, selectedValue)
// AsyncStorage.removeItem('userToken')

    return (
        <AuthContext.Provider
            value={{
                user,
                dispatch,
                login: async (data) => {
                    try {
                        let signIn = await API.signIn(data)
                        if ( typeof signIn !== "undefined" && signIn.hasOwnProperty('success') && signIn.success) {
                            dispatch({
                                type: 'SIGN_IN',
                                isSignout: false,
                                token: signIn.data.token,
                                id: signIn.data.id,
                                username: signIn.data.username,
                                firstName: signIn.data.firstName,
                                lastName: signIn.data.lastName,
                                email: signIn.data.email,
                                phone: signIn.data.phone,
                                profileImage: signIn.data.profile_picture
                            })
                            newLogOutMessage = "" ;
                            AsyncStorageHelper.setObjectValue('user', signIn);
                        }
                        return signIn
                    } catch (e) {
                        console.log(e)
                    }
                },
                register: (data) => {
                    try {
                        newLogOutMessage = "" ;
                        return API.signUp(data)
                    } catch (e) {
                        console.log(e)
                    }
                },
                logout: async ( hasLogOutMessage = false ) => {
                    try {
                        newLogOutMessage = hasLogOutMessage ;
                        await AsyncStorageHelper.removeValue('user' )
                        let newUserdata = {
                            type: 'SIGN_OUT',
                            token: null,
                            id: null,
                            username: null,
                            firstName: null,
                            lastName: null,
                            email: null,
                            phone: null,
                            isSignout: true,
                            profileImage: null,
                            logoutMsg: newLogOutMessage
                        };
                        dispatch( newUserdata );
                        return newUserdata;
                    } catch (e) {
                        console.error(e)
                    }
                },
                userStateChanged: () => {
                    try {
                        newLogOutMessage = "" ;
                        return user
                    } catch (e) {
                        console.error(e)
                    }
                }
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
