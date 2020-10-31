import AsyncStorage  from '@react-native-community/async-storage';

const AsyncStorageHelper = {
    getAllKeys : async () => {
        let keys = []
        try {
            keys = await AsyncStorage.getAllKeys()
            return keys;
        } catch(e) {
            console.log( e )
            return false;
        }
    },
    getMyStringValue : async ( key ) => {
        try {
            return await AsyncStorage.getItem( key )
        } catch(e) {
            // read error
            console.log( e );
            return false;
        }
    },
    getMyObject : async ( key ) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key)
            return jsonValue != null ? JSON.parse(jsonValue) : null
        } catch(e) {
            console.log( e )
            return false;
        }
    },
    setStringValue : async (key , value) => {
        try {
            await AsyncStorage.setItem(key , value)
        } catch(e) {
            console.log( e );
            return false;
        }
    },
    setObjectValue : async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(key, jsonValue)
        } catch(e) {
            console.log( e );
            return false;
        }
    },
    removeValue : async ( key ) => {
        try {
            await AsyncStorage.removeItem(key)
        } catch(e) {
            console.log( e );
            return false;
        }
    },
    getUserData: async () => {
        let signIn = await AsyncStorageHelper.getMyObject('user');
        if (
            typeof signIn !== "undefined"
            && signIn !== false
            && typeof signIn === 'object' && signIn !== null
            && signIn.hasOwnProperty('success')
            && signIn.success === true
        ) {
            return signIn.data;
        }
        return false;
    }
};


export default AsyncStorageHelper;