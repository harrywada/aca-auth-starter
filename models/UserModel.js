const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },

  password: {
    type: String,
    required: true
  }
});

UserSchema.set("toJSON", {
  transform: function(doc, ret, options){
    delete ret.password;
    return ret;
  }
});

module.exports = mongoose.model('User', UserSchema)
