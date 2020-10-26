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
                            profileImage: action.profile_picture
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
                            profileImage: null
                        };
                }
            }
        },
        {
            isLoading: true,
            isSignout: false,
            token: null,
            id: null,
            username: null,
            firstName: null,
            lastName: null,
            email: null,
            phone: null,
            profileImage: null,
        }
    );


    useEffect(() => {
        const bootstrapAsync = async () => {
            let signIn;
            try {
                //userToken = await AsyncStorage.getItem('userToken');
                signIn = await AsyncStorageHelper.getMyObject('user');

                if (typeof signIn !== "undefined" && signIn.hasOwnProperty('success') && signIn.success) {

                    //Validate the userToken before restore
                    let validateToken = await API.validateToken( { username: signIn.data.email , token : signIn.data.token } );
                    if( validateToken.success ){
                        //dispatch({ type: 'RESTORE_TOKEN', token: userToken });
                        dispatch({
                            type: 'RESTORE_TOKEN',
                            token: validateToken.data.token,
                            id: validateToken.data.id,
                            username: validateToken.data.username,
                            firstName: validateToken.data.firstName,
                            lastName: validateToken.data.lastName,
                            email: validateToken.data.email,
                            phone: validateToken.data.phone,
                            profileImage: validateToken.data.profile_picture
                        })

                        await AsyncStorageHelper.setObjectValue('user',validateToken)
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
                        if (signIn.success) {
                            dispatch({
                                type: 'SIGN_IN',
                                token: signIn.data.token,
                                id: signIn.data.id,
                                username: signIn.data.username,
                                firstName: signIn.data.firstName,
                                lastName: signIn.data.lastName,
                                email: signIn.data.email,
                                phone: signIn.data.phone,
                                profileImage: signIn.data.profile_picture
                            })
                            AsyncStorageHelper.setObjectValue('user', signIn);
                        }
                        return signIn
                    } catch (e) {
                        console.log(e)
                    }
                },
                register: (data) => {
                    try {
                        return API.signUp(data)
                    } catch (e) {
                        console.log(e)
                    }
                },

                userStateChanged: () => {
                    try {
                        return user
                    } catch (e) {
                        console.error(e)
                    }
                },
                logout: async () => {
                    try {
                        await AsyncStorageHelper.removeValue("user")
                        dispatch({type: 'SIGN_OUT'});
                        return  null
                    } catch (e) {
                        console.error(e)
                    }
                },
                skipLogin: () => {
                    try {
                        const u = {
                            id: 'skip'
                        }
                        return u;
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
