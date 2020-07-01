"use strict";

/*
|--------------------------------------------------------------------------
| UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
// const Factory = use('Factory')
const User = use("App/Models/User");

class UserSeeder {
  async run() {
    const users = [
      {
        username: "admin",
        email: "admin@email.com",
        password: "admin",
        is_admin: 1,
      },
      {
        username: "bobo",
        email: "bobo@email.com",
        password: "bobo",
      },
      {
        username: "lina",
        email: "lina@email.com",
        password: "lina",
      },
      {
        username: "dana",
        email: "dana@email.com",
        password: "dana",
      },
      {
        username: "femi",
        email: "femi@email.com",
        password: "femi",
      },
    ];
    await User.createMany(users);
  }
}

module.exports = UserSeeder;
