import AsyncStorage from '@react-native-community/async-storage';

function isJsonOk(text) {
    if (typeof text === "undefined" || text === null || text === "") {
        //console.log("isJsonOk", false);
        return false;
    }
    //console.log(text);
    return /^[\],:{}\s]*$/.test(text.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''));
}

const AsyncStorageHelper = {
    getAllKeys: async () => {
        let keys = []
        try {
            keys = await AsyncStorage.getAllKeys()
            return keys;
        } catch (e) {
            //console.log( e )
            return false;
        }
    },
    getMyStringValue: async (key) => {
        try {
            return await AsyncStorage.getItem(key)
        } catch (e) {
            // read error
            //console.log( e );
            return false;
        }
    },
    getMyObject: async (key) => {
        try {
            const jsonValue = await AsyncStorage.getItem(key);
            //console.log( "getMyObject" , key , jsonValue );
            let p = isJsonOk(jsonValue);
            //console.log( "p" , p );
            return p ? JSON.parse(jsonValue) : null
        } catch (e) {
            //console.log( e )
            return false;
        }
    },
    setStringValue: async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value)
        } catch (e) {
            //console.log( e );
            return false;
        }
    },
    setObjectValue: async (key, value) => {
        try {
            const jsonValue = JSON.stringify(value)
            let p = isJsonOk(jsonValue);
            //console.log( "p" , p );
            if (p) {
                //console.log( "setObjectValue" , key ,jsonValue );
                await AsyncStorage.setItem(key, jsonValue)
            } else {
                //console.log( "removeValue" , key ,jsonValue );
                await AsyncStorage.removeItem(key)
            }
        } catch (e) {
            //console.log( e );
            return false;
        }
    },
    removeValue: async (key) => {
        try {
            await AsyncStorage.removeItem(key)
        } catch (e) {
            //console.log( e );
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
    },
    getCatList: async () => {
        let catList = await AsyncStorageHelper.getMyObject('catList');
        //console.log( catList );
        if (
            typeof catList !== "undefined"
            && catList !== false
            && Array.isArray(catList) && catList.length > 0
        ) {
            return catList;
        }
        return false;
    }
};


export default AsyncStorageHelper;