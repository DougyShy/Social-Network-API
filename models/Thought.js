const { Schema, Types, model } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => {
            if (date) {
                return date.toLocaleString();
            }
        }
    }
},
{
    toJSON: {
        getters: true,
    },
});

// Construct a new instance of the schema class
const thoughtSchema = new Schema({
    // Configure individual properties using Schema Types
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => {
            if (date) {
                return date.toLocaleString();
            }
        }
    },

    username: {
        type: String,
        required: true
    },

    reactions: [
        reactionSchema    
    ],
    
},
{
    toJSON: {
        getters: true,
    },
}
);

thoughtSchema
    .virtual('reactionCount')
    // Getter
    .get(function() {
        return this.reactions.length
    })

// Initialize our models
const Thought = model('thought', thoughtSchema);

module.exports = Thought;

