const api_server = 'http://ec2-34-211-51-75.us-west-2.compute.amazonaws.com'

function makeGetRequest(path, userData) {

}

 function  makePostRequest(path, userData) {
        const data = {
            StudentAppUser: userData
        }
        
        // console.log(data)

        fetch(`${api_server}${path}`, {
            method: 'POST',
            mode: 'no-cors',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => console.log(data))

        // let responseJson = await response.json()

        // console.log(responseJson)
}

function makePutRequest() {  }


const API =
    {
        signUp: (userData) => {
            const path = `/signup`;
            makePostRequest(path, userData);
            console.log(data)
        },
        signIn: () => {}
    }

export default API