
const axios = require('axios')

const API_ENDPOINT = 'https://serverprueba-con.herokuapp.com/user/login'

exports.handler = async (event, context,callback) => {
  let response
  console.log(event.body);
  try {
    response = await fetch({
        url:API_ENDPOINT,
        body:event.body,
        method: 'POST',
        mode: 'cors',
        body: event.body,
        headers: {
            'Content-Type': 'application/json'
        }
    })
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    }
  }

  return callback(null, {
        statusCode: 200,
        body: JSON.stringify({data: response.data})
  })
}