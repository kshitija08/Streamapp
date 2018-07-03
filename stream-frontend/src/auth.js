var  axios  =require('axios');

module.exports = {    
    getToken: function(username, pass) {
    let url = 'http://127.0.0.1:8000/streamapp/obtain-auth-token/';
        axios.post( url, {
            username: username,
            password: pass
  })
  .then(function (response) {
    localStorage.token = response.data.token
    
  })
  .catch(function (error) {
    return (false)
  });
}
}