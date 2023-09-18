const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name: {type: String, required: true, index: true},
    last_name: {type: String, required: true},
    email: {type: String, required: true, index: true},
    age: {type: Number, required: true},
    password: {type: String, required: true, index: true},
    role: {
        type: String,
        enum: [ "usuario", "administrador"],
        default: "usuario"
      },
});

const userModel = mongoose.model('Usuario', userSchema);

module.exports ={userModel};
