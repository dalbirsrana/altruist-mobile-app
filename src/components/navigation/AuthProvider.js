import React, { createContext, useState } from 'react';

/**
 * This provider is created
 * to access user in whole app
 */

export const AuthContext = createContext({});

// const signInWithEmailAndPassword = (email, password) => {

  // fetch("http://test/create", {
  //   method: "POST",
  //   headers: {
  //      'Content-Type': 'application/json'  
  //   },
  //   body: JSON.stringify({
  //     username: email,
  //     password: password,
  //   })
  // })
  // .then((response) => response.json())
  // .then((data) => {
  //   setUser = () => {
  //      user.name = data.name
  //   }
  // })


//   if(email == 'test@gmail.com' && password == 'test') {
//     setUser = () => {
      
//       user = [{
//         email: email,
//         id: '123456',
//         isAuthenticated: true
//       }]

//     }
//   }
// }

// const createUserWithEmailAndPassword = (email, password) => {

// }

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
            console.log(e);
          }
        },
        register: async (email, password) => {
          try {
            await createUserWithEmailAndPassword(email, password);
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            user = null;
          } catch (e) {
            console.error(e);
          }
        },
        userStateChanged: () => {
          try {
            return user
          } catch (e) {
            console.error(e);
          }
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
