var mongoose = require('mongoose');
mongoose.connect('mongod://localhost/test');

var userSchema = mongoose.Schema({
  id: Number,
  name: String,
  like: [String],
  dislike: [String]
});

var User = mongoose.model('User', userSchema);

var saveUser = (data) => {
  return new User(data).save();
}

var findUser = (username) => {
  return User.find({name: username});
}

module.exports.saveUser = saveUser;
module.exports.findUser = findUser;
