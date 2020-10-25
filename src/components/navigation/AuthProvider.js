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
  
  (prevState, ...action) => {

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
        login: async (data) => {
          try {
            let signIn = await API.signIn(data)

            if (signIn.success) {
              dispatch({ type: 'SIGN_IN', token: signIn.data[0].data.token, id: signIn.data[0].data.id, firstName: signIn.data[0].data.firstName, email: signIn.data[0].data.email, phone: signIn.data[0].data.phone })
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
