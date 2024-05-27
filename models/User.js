// Require schema and model from mongoose
const { Schema, model } = require('mongoose');

// Construct a new instance of the schema class
const userSchema = new Schema({
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
            ref: 'thought',
            default: [],
        },
    ], 
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'user',
            default: [],
        },
    ],   
    },
    {
        // Mongoose supports two Schema options to transform Objects after querying MongoDb: toJSON and toObject.
        // Here we are indicating that we want virtuals to be included with our response, overriding the default behavior
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
);

userSchema
    .virtual('friendCount')
    // Getter
    .get(function() {
        return this.friends.length
    })

// Create a virtual property `commentCount` that gets the amount of comments per user
const User = model('user', userSchema);

module.exports = User;
