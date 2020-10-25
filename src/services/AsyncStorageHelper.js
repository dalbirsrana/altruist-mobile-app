import AsyncStorage  from '@react-native-community/async-storage';

const AsyncStorageHelper = {
    getAllKeys : async () => {
        let keys = []
        try {
            keys = await AsyncStorage.getAllKeys()
            return keys;
        } catch(e) {
            console.log( e )
        }
    },
    getMyStringValue : async ( key ) => {
        try {
            return await AsyncStorage.getItem( key )
        } catch(e) {
            // read error
            console.log( e )
        }
    },
    getMyObject : async ( key ) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key)
            return jsonValue != null ? JSON.parse(jsonValue) : null
        } catch(e) {
            console.log( e )
        }
    },
    setStringValue : async (key , value) => {
        try {
            await AsyncStorage.setItem(key , value)
        } catch(e) {
            console.log( e )
        }
    },
    setObjectValue : async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(key, jsonValue)
        } catch(e) {
            console.log( e )
        }
    },
    removeValue : async ( key ) => {
        try {
            await AsyncStorage.removeItem(key)
        } catch(e) {
            console.log( e )
        }
    }
};


export default AsyncStorageHelper;