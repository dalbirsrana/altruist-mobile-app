import React, { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AuthStack from './AuthStack';
import HomeTabs from './HomeTabs';
import { AuthContext } from './AuthProvider';
import Loading from '../../common/Loading';

export default function Routes() {
  const { user, dispatch } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  // Handle user state changes
  function stateChanged(user) {
    dispatch(user);
    setLoading(false);
  }

  useEffect(() => {
    return stateChanged(user);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {  (  typeof user !== "undefined" && user !=  null && !user.isSignout ) ? <HomeTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}
