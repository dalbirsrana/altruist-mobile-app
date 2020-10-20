const api_server = 'http://ec2-34-211-51-75.us-west-2.compute.amazonaws.com'

function makeGetRequest(path, userData) {

}

async function makePostRequest(path, userData) {

        const data = {
            StudentAppUser: userData
        }

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

function makePutRequest() {  }


const API =
    {
        signUp: (userData) => {
            return makePostRequest('/signup', userData)
        },
        signIn: () => {}
    }

export default API