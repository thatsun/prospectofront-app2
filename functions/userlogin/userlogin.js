/* eslint-disable */
const fetch = require("node-fetch");
exports.handler = async function(event, context) {
  const headers = {
    
    'Content-Type': 'application/json'
    
  };

  try {
    const response = await fetch("https://serverprueba-con.herokuapp.com/user/login", {
      method:'POST',      
      body:event.body,
      mode: 'cors',
      headers:headers
    });
    if (!response.ok) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }
    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data)
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
};
