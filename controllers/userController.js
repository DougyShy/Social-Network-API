const User = require('../models/User');

module.exports = {
    async getUsers(req, res) {
      try {
        const users = await User.find();
        res.json(users);
      } catch (err) {
        res.status(500).json(err)
      }
    },
    async getSingleUser(req, res) {
      try {
        const user = await User.findOne({ _id: req.params.userId });
  
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
  
        res.json(user);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // create a new user
    async createUser(req, res) {
      try {
        const dbUserData = await User.create(req.body);
        res.json(dbUserData);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // update an existing user
    async updateUser(req, res) {
      try {
        const dbUserData = await User.findOneAndUpdate({ _id: req.params.userId }, req.body);
        res.json(dbUserData);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // delete an existing user
    async deleteUser(req, res) {
      try {
        const user = await User.findOneAndDelete({ _id: req.params.userId });
  
        if (!user) {
          return res.status(404).json({ message: 'No user with that ID' });
        }
  
        //await Application.deleteMany({ _id: { $in: user.applications } });
        res.json({ message: 'User and associated apps deleted!' })
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // add a new friend to a user's friend list
    async addNewFriend(req, res) {
      try {
        const user = req.params.userId;
        const newFriend = req.params.friendId;
        if ((!user) || (!newFriend)) {
          return res.status(404).json({ message: 'No user with that ID or no new Friend with that ID' });
        } 

        // await adding a friend to a user's friend list
        const friend = await User.updateOne({ _id: user }, {$addToSet: {friends: newFriend}}); // addToSet prevents duplicates from being entered
        res.json(friend);
      } catch (err) {
        res.status(500).json(err);
      }
    },
    // delete a friend from a user's friend list
    async deleteFriend(req, res) {
      try {
        const user = req.params.userId;
        const friendToDelete = req.params.friendId;
        if ((!user) || (!friendToDelete)) {
          return res.status(404).json({ message: 'No user with that ID or no new Friend with that ID' });
        }

        // await deleting a friend from a user's friend list
        const friend = await User.updateOne({ _id: user }, { $pull: { friends: friendToDelete }}); //, {safe: true, multi:true });
        res.json(friend);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  }