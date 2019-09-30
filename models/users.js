const mongoose = require('mongoose');
const schema = mongoose.Schema;
const bcrypt = require('bcrypt');    

const userSchema = new schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
});

// Encrypting Passwords
userSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

// Validating password
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};
  

module.exports = mongoose.model("users",userSchema);