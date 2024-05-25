// Require schema and model from mongoose
const mongoose = require('mongoose');
const { scheduler } = require('timers/promises');

// Function to test if a string qualifies as a valid email address according to regex filtering
// Note: I pulled this one I used from the last module. Some can be more strict than others
/* NOT NEEDED
var validateEmail = function(email) {
    var re = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6})*$/;
}*/

// Construct a new instance of the schema class
const userSchema = new mongoose.Schema({
    // Configure individual properties using Schema Types
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                // Note: I pulled this one I used from the last module. Some can be more strict than others
                return /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6})*$/.test(v);
            },
            nmessage: "Please enter a valid email"
        }
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thoughts',
        },
    ], 
    friends: [
        {
            type: Schema.Types.ObectId,
            ref: 'User',
        },
    ],   
});

module.exports = User;
