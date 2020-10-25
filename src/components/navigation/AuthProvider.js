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
                            userToken: action.token,
                            isLoading: false,
                        };
                    case 'SIGN_IN':
                        return {
                            ...prevState,
                            isSignout: false,
                            userToken: action.token,
                            userId: action.id,
                            userName: action.firstName,
                            userEmail: action.email,
                            userPhone: action.phone,
                        };
                    case 'SIGN_OUT':
                        return {
                            ...prevState,
                            isSignout: true,
                            userToken: null,
                        };
                }
            }
        },
        {
            isLoading: true,
            isSignout: false,
            userToken: null,
            userId: '',
            userName: '',
            userEmail: '',
            userPhone: '',
        }
    );


    useEffect(() => {
        const bootstrapAsync = async () => {
            let signIn;
            try {
                //userToken = await AsyncStorage.getItem('userToken');
                signIn = await AsyncStorageHelper.getMyObject('user');
                //Validate the userToken before restore

                if (typeof signIn !== "undefined" && signIn.hasOwnProperty('success') && signIn.success) {
                    //dispatch({ type: 'RESTORE_TOKEN', token: userToken });
                    dispatch({
                        type: 'SIGN_IN',
                        token: signIn.data.token,
                        id: signIn.data.id,
                        firstName: signIn.data.firstName,
                        email: signIn.data.email,
                        phone: signIn.data.phone
                    })
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
                                firstName: signIn.data.firstName,
                                email: signIn.data.email,
                                phone: signIn.data.phone
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
                logout: () => dispatch({type: 'SIGN_OUT'}),
                userStateChanged: () => {
                    try {
                        return user
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
