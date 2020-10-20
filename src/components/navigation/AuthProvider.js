import React, { createContext, useState } from 'react';
import API from '../../services/api'
/**
 * This provider is created
 * to access user in whole app
 */

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

const signInWithEmailAndPassword = (email, pass) => {
  const u = {
    id: email,
    password: pass
  }
  setUser(u)
}

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {

            signInWithEmailAndPassword(email, password)

          } catch (e) {
            console.log(e)
          }
        },
        register: (email, password) => {
          try {

            let StudentAppUser = { 
              user_role_id: '1',
              firstName: 'dalbir',
              lastName: 'singh',
              email: email, 
              password: password
            }

          return API.signUp(StudentAppUser)

          } catch (e) {
            console.log(e)
          }
        },
        logout: async () => {
          try {
            setUser(null)
          } catch (e) {
            console.error(e)
          }
        },
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
            return setUser(u)
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
