import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import { AuthContext } from './AuthProvider';
import Loading from '../../common/Loading';

export default function Routes() {
  const { user, dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  // Handle user state changes
  function stateChanged(user) {
    dispatch(user);
    if (initializing) setInitializing(false);
    setLoading(false);
  }

  useEffect(() => {
    return stateChanged();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {  (  typeof user !== "undefined" && user !=  null ) ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
