const { Thought, User } = require('../models');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.status(thoughts);                
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await.Thought.findOne({ _id: req.params.thoughtId });

            if(!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    }, 
    // Create a new thought
    async createThought(req, res) {
        try {
            const dbThoughtData = await Thought.create(req.body);
            res.json(dbThoughtData);
        } catch(err) {
            res.status(500).json(err);
        }
    },
};