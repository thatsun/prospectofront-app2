const axios = require('axios');

exports.handler = async function (event) { 
    try {
        // Call the Weather API
        const { data } = await axios({            
            url: 'https://serverprueba-con.herokuapp.com/login',            
            method: 'POST',
            mode: 'cors',
            body: event.body,
            headers: {
            'Content-Type': 'application/json'
            
            }
        })
        
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        }
    } catch (e) {
        console.log(e)
        return {
            statusCode: 500,
            body: 'Server error.'
        }
    }
}