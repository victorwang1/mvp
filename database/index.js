var mongoose = require('mongoose');
mongoose.connect('mongod://localhost/test');

var userSchema = mongoose.Schema({
  id: Number,
  name: String
});

var User = mongoose.model('User', userSchema);

var saveUser = (userInfo) => {
  return new User(userInfo).save();
}

var findUser = (username) => {
  return User.find();
}

module.exports.saveUser = saveUser;
module.exports.findUser = findUser;
