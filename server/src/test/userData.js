const mongoose = require('mongoose');
const User = require('./../models/user');

mongoose
  .connect(process.env.DB_URI)
  .then(async (result) => {
    const user = await User.create({
      firstName: 'test',
      lastName: 'kek',
      email: 'okokokok',
      password: 'qweqweqweqwe',
      username: 'rituparna',
      vCode: 123123,
      dateOfBirth: '5-3-2022',
      gender: 'M',
    });
    console.log(user);
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(0);
  });
