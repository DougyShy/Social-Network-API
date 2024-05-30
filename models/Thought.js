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
            if (date) return date.toISOString().split("T") [0];
        }
    }
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
                return new Date().toISOString().split("T") [0]; 
            }
        }
    },

    username: {
        type: String,
        required: true
    },

    // Just messing around - not a requirement
    /*updatedAt: {
        type: Date,
        get: (date) => {
            if (date) {
                return new Date().toISOString().split("T") [0]; 
            }
        }
    },*/

    reactions: [
        reactionSchema    
    ],
    
}
//{ timestamps: true }
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

