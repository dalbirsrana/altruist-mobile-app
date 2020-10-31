const api_server = 'http://ec2-34-211-51-75.us-west-2.compute.amazonaws.com'

async function makePostRequest(path, data) {
        console.log(data)
        let result = {};
        await fetch(`${api_server}${path}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(resData => { 
            result = resData
        })
        .catch( error => console.error('Error:', error))
        return result
    }

const API =
    {
        signUp: (userData) => {
            return makePostRequest('/signup', {StudentAppUser: userData})
        },
        signIn: (userData) => {
            return makePostRequest('/login', {StudentAppUser: userData})
        },
        validateToken: (userData) => {
            return makePostRequest('/validate-token', {StudentAppUser: userData})
        },
        resetPasswordCheck: (userData) => {
            return makePostRequest('/reset-password-check', {StudentAppUser: userData})
        },
        changePassword: (userData) => {
            return makePostRequest('/reset-password', {StudentAppUser: userData})
        },
        verifyAccount: (userData) => {
            return makePostRequest('/verify-email', {StudentAppUser: userData})
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
                return makePostRequest('/posts', {Posts: data})
            }
        }

    }

export default API