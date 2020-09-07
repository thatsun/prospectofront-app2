
const axios = require('axios')

const API_ENDPOINT = 'https://serverprueba-con.herokuapp.com/user/login'

exports.handler = async (event, context) => {
  let response
  try {
    response = await axios.get({
        url:API_ENDPOINT,
        body:event.body
    })
  } catch (err) {
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      data: response.data
    })
  }
}