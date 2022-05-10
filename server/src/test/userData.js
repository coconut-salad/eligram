const mongoose = require('mongoose');
const User = require('./../models/user');

mongoose
  .connect(process.env.DB_URI + 'test')
  .then(async (result) => {
    const user = await User.create({
      firstName: 'test',
      lastName: 'kek',
      email: 'okokokokd',
      password: 'qweqweqweqwe',
      username: 'rituparnad',
      vCode: 123123,
      dateOfBirth: '2001-10-16',
      // date format yyyy-mm-dd
      gender: 'M',
    });
    console.log(user);
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(0);
  });
