import AsyncStorageHelper from "./AsyncStorageHelper";

const api_server = 'http://ec2-34-211-51-75.us-west-2.compute.amazonaws.com'
const GET = "GET" ;
const POST = "POST" ;

async function makeRequest(path, data, method="POST" ) {
        console.log(data)
        let result = {};
        let defaultHeaders = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };

        let signIn = await AsyncStorageHelper.getMyObject('user');
        if (typeof signIn !== "undefined" && signIn.hasOwnProperty('success') && signIn.success) {
            defaultHeaders.Authorization = "Bearer "+signIn.data.token;
        }

        let options = {
            method: method ,
            headers: defaultHeaders,
        } ;
        if( method === POST ){
            options.body = JSON.stringify(data);
        }
        await fetch(`${api_server}${path}`,  options )
        .then(response => response.json())
        .then(resData => { 
            result = resData
        })
        .catch(  ( error ) => function(){
            console.error('Error:', error);
            return error;
        });

        return result
    }

const API =
    {
        signUp: (userData) => {
            return  makeRequest('/signup', {StudentAppUser: userData})
        },
        signIn: async (userData) => {
            return await makeRequest('/login', {StudentAppUser: userData})
        },
        validateToken: (userData) => {
            return makeRequest('/validate-token', {StudentAppUser: userData})
        },
        resetPasswordCheck: (userData) => {
            return makeRequest('/reset-password-check', {StudentAppUser: userData})
        },
        changePassword: (userData) => {
            return makeRequest('/reset-password', {StudentAppUser: userData})
        },
        verifyAccount: (userData) => {
            return makeRequest('/verify-email', {StudentAppUser: userData})
        },
        uploadImageAsync: async (uri) => {
            let apiUrl = api_server+'/upload-file';
            let uriParts = uri.split('.');
            let fileType = uriParts[uriParts.length - 1];

            let formData = new FormData();
            formData.append('photo', {
                uri,
                name: `photo.${fileType}`,
                type: `image/${fileType}`,
            });
            //formData.append('XDEBUG_SESSION_START', '19854');
            console.log(formData);
            let options = {
                method: 'POST',
                body: formData,
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
            };
            return fetch(apiUrl, options);
        },


        Post : {
            create : ( data ) => {
                return makeRequest('/posts', {Posts: data})
            }
        },

        PostTypes : {
            list : ( data ) => {
                return makeRequest('/post-types', {Posts: data}, GET)
            }
        },

        PostCategories : {
            list : () => {
                return makeRequest('/post-categories', {}, GET)
            }
        }

    }

export default API