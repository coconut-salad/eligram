const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

const User = require('./../../models/user');

mongoose
  .connect(process.env.DB_URI)
  .then(async (result) => {
    const hash = await bcrypt.hash('qwer1234', 12);
    for (let i = 0; i < 100; i++) {
      await User.create({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: hash,
        username: Date.now(),
        emailVerified: Math.random() > 0.5 ? true : false,
        profileComplete: Math.random() > 0.5 ? true : false,
        vCode: 123123,
        dateOfBirth: '2001-10-31',
        gender: Math.random() > 0.5 ? 'M' : 'F',
        role: 'USER',
      });
      console.log(i);
    }
    console.log('Database seeded');
    process.exit(0);
  })
  .catch((err) => {
    console.log(err.message);
    process.exit(0);
  });
