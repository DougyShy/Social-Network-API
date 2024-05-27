const { Schema, Types, model } = require('mongoose');

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
            if (date) return date.toISOString().split("T") [0]; 
        }
    },
    userName: {
        type: String,
        required: true
    },
    reactions: [
        reactionSchema    
    ]
});

thoughtSchema
    .virtual('reactionCount')
    // Getter
    .get(function() {
        return this.reactions.length
    })

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
            if (date) return date.toISOString().split("T") [0];
        }
    }
});

// Initialize our models
const Thought = model('thought', thoughtSchema);

module.exports = Thought;

