const Thought = require('../models/Thought');
const User = require('../models/User');

module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);                
        } catch (err) {
            console.log('HERE');
            res.status(500).json(err)
        }
    },
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId });

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
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: dbThoughtData._id } },
                { new: true }
            );

            if (!user) {
                return res.status(400).json({
                    message: 'Thought created, but found no user with that ID',
                })
            }

            res.json(dbThoughtData);
        } catch(err) {
            res.status(500).json(err);
        }
    },

    // update an existing thought
    async updateThought(req, res) {
        try {
          const dbThoughtData = await User.findOneAndUpdate({ _id: req.params.userId }, req.body);
          res.json(dbThoughtData);
        } catch (err) {
          res.status(500).json(err);
        }
      },

    // delete an existing thought
    async deleteThought(req, res) {
        try {
          const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });
    
          if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
          }
    
          //await Application.deleteMany({ _id: { $in: user.applications } });
          res.json({ message: 'Thought and associated reactions deleted!' }) // reactions not deleted yet??
        } catch (err) {
          res.status(500).json(err);
        }
      },
};