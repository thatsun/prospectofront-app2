
const axios = require('axios')

const API_ENDPOINT = 'https://serverprueba-con.herokuapp.com/user/login'

exports.handler = async (event, context,callback) => {
  console.log("soy el hadler");
  

  return callback(null, {
        statusCode: 200,
        body: JSON.stringify({data: response.data})
  })
}