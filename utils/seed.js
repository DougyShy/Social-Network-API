const connection = require('../config/connection');
const User = require('../models/User');
const Thought = require('../models/Thought');
const { getRandomName } = require('./data');

// Start the seeding runtime timer

console.time('seeding');

// Creates a connection to mongodb
connection.once('open', async () => {
  // Delete the collections if they exist
  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();

  if (userCheck.length) {
    await connection.dropCollection('users');
    await connection.dropCollection('thoughts');
  }

  // Empty arrays for randomly generated users
  const users = [];
  const thoughts = [];

  for (let i = 0; i < 5; i++) {
    const name = getRandomName();
    const newThought = {
      thoughtText: 'This is thought number' + i,
      username: name,
      reactions: []
    };
    console.log(newThought);
    const newUser = {
      username: name,
      email: 'EmailNumber' + i + '@yahoo.com',
      thoughts: [],
      friends: []
    };
    users.push(newUser);
    thoughts.push(newThought);
    console.log(newThought);

  }

  // Wait for the users to be inserted into the database
  await User.insertMany(users);
  await Thought.insertMany(thoughts)

  console.table(users);
  console.table(thoughts);
  console.timeEnd('seeding complete 🌱');
  process.exit(0);
});