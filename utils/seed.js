const connection = require('../config/connection');
const User = require('../models/User');
const { getRandomName, emails } = require('./data');

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

  for (let i = 0; i < 5; i++) {
    const name = getRandomName();
    const newUser = {
      username: name,
      email: emails[i],
      thoughts: [],
      friends: []
      
    };
    users.push(newUser);
  }

  // Wait for the users to be inserted into the database
  await User.insertMany(users);

  console.table(users);
  console.timeEnd('seeding complete 🌱');
  process.exit(0);
});