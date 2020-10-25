import React, { createContext, useReducer, useEffect } from 'react';
import AsyncStorage  from '@react-native-community/async-storage';
import API from '../../services/api';
/**
 * This provider is created
 * to access user in whole app
 */

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  
const [user, dispatch] = useReducer(
  
  (prevState, action) => {

    switch (true) {
      case (action.type == 'RESTORE_TOKEN'): 
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
        };
      case 'SIGN_OUT':
        return {
          ...prevState,
          isSignout: true,
          userToken: null,
        };
    }
  },
  {
    isLoading: true,
    isSignout: false,
    userToken: null,
  }
);


useEffect(() => {
  const bootstrapAsync = async () => {
    let userToken;

    try {
      userToken = await AsyncStorage.getItem('userToken');
    } catch (e) {
    }
    
    //Validate the userToken before restore

    dispatch({ type: 'RESTORE_TOKEN', token: userToken });
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
        login: async (email, password) => {
          try {

            signInWithEmailAndPassword(email, password)

          } catch (e) {
            console.log(e)
          }
        },
        register: (StudentAppUser) => {
          try {

          return API.signUp(StudentAppUser)

          } catch (e) {
            console.log(e)
          }
        },
        logout: () => dispatch({ type: 'SIGN_OUT' }),
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
