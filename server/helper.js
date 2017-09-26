const rp = require('request-promise');

var getYelpToken = () => {
  var options = {
    uri: 'https://api.yelp.com/oauth2/token',
    qs: {
      grant_type: 'client_credentials',
      client_id: 'bMgLlO__eATw8Jdv6lbC7w',
      client_secret: 'gvo8tfQ04juEQxLTRmoUy7gjWNMc86Mtt28Y974LlY7DkuotJh87L9EStJCCUytq'
    }
  }
  return rp(options);
}



module.exports.getYelpToken = getYelpToken;
