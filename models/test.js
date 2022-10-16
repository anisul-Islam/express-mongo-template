const { Schema, model } = require('mongoose');

const testSchema = new Schema({
    email: {
        type: String,
        required: [true, 'email is required'],
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [3, 'password must have atleast 3 characters']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

exports.Test = model('Tests', testSchema);
