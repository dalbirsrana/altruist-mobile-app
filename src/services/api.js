import AsyncStorageHelper from "./AsyncStorageHelper";

// DEV SERVER { Use in case if something is not working on prod because of it is not available there }
// const api_server = 'http://34.208.106.207'

// PROD SERVER
const api_server = 'http://ec2-3-134-106-137.us-east-2.compute.amazonaws.com'

// Jaimin Local MAMP Server
// const api_server = 'http://192.168.0.124/capstone/capstone-api'

const GET = "GET";
const POST = "POST";

async function makeRequest(path, data, method = "POST") {

    let result = {};
    let defaultHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };

    let userData = await AsyncStorageHelper.getUserData();
    if (userData !== false) {
        defaultHeaders.Authorization = "Bearer " + userData.token;
    }

    let options = {
        method: method,
        headers: defaultHeaders,
    };
    if (method === POST) {
        options.body = JSON.stringify(data);
    }

    // console.log(`${api_server}${path}?XDEBUG_SESSION_START=12744`);
    // console.log(options);

    await fetch(`${api_server}${path}?XDEBUG_SESSION_START=12744`, options)
        .then(response => response.json())
        .then(resData => {
            result = resData;
        })
        .catch((error) => function () {
            console.error('Error:', error);
            return {success: false, data: {message: 'Internal error occured.'}};
        });

    result.tokenExpired = false;
    if (result.success === false) {
        if (result.data.hasOwnProperty('name') && result.data.name === "Unauthorized") {
            result.tokenExpired = true;
        }
    }

    // console.log(result);
    return result
}

const API =
    {
        signUp: (userData) => {
            return makeRequest('/signup', {StudentAppUser: userData})
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
            let apiUrl = api_server + '/upload-file';
            let uriParts = uri.split('.');
            let fileType = uriParts[uriParts.length - 1];

            let defaultHeaders = {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            };
            let userData = await AsyncStorageHelper.getUserData();
            if (userData !== false) {
                defaultHeaders.Authorization = "Bearer " + userData.token;
            }

            let formData = new FormData();
            formData.append('photo', {
                uri,
                name: `photo.${fileType}`,
                type: `image/${fileType}`,
            });
            //formData.append('XDEBUG_SESSION_START', '19854');
            // console.log(formData);
            let options = {
                method: 'POST',
                body: formData,
                headers: defaultHeaders,
            };
            return fetch(apiUrl, options);
        },

        Post: {
            create: (data) => {
                return makeRequest('/posts', {Posts: data})
            },
            getCityName: (data) => {
                return makeRequest('/city-name', {Posts: data})
            },
            list: (data) => {
                return makeRequest('/posts', {}, GET)
            },
            view: (id) => {
                return makeRequest('/posts/' + id, {}, GET)
            },
            openList: () => {
                return makeRequest('/open-posts', {}, GET)
            },
            single: (id) => {
                return makeRequest('/posts/' + id, {}, GET)
            },
            like: (id) => {
                return makeRequest('/like/' + id, {PostActivity: {post_id: id}}, POST)
            },
            save: (id) => {
                return makeRequest('/save/' + id, {PostActivity: {post_id: id}}, POST)
            },
            request: (id) => {
                return makeRequest('/request', {PostComments: {post_id: id}}, POST)
            },
            requestExist: (id) => {
                return makeRequest('/check-request-made/' + id, {}, GET)
            },
            accept: (id) => {
                return makeRequest('/accept', {PostComments: {request_id: id}}, POST)
            },
            decline: (id) => {
                return makeRequest('/decline', {PostComments: {request_id: id}}, POST)
            },
        },
        User: {
            getSavedPosts: () => {
                return makeRequest('/user-saved-posts', {}, GET)
            },
            getPosts: () => {
                return makeRequest('/user-posts', {}, GET)
            },
            getNotifications: () => {
                return makeRequest('/notifications', {}, GET)
            },
            changePicture: async (data) => {
                return await makeRequest('/change-picture', {StudentAppUser: data})
            }
        },

        PostTypes: {
            list: (data) => {
                return makeRequest('/post-types', {}, GET)
            }
        },
        PostCategories: {
            list: async () => {
                return makeRequest('/post-categories', {}, GET)
            }
        },
        topHelper: () => {
            return makeRequest('/top-helpers', {}, GET)
        }
    }

export default API