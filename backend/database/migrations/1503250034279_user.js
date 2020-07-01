"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.create("users", (table) => {
      table.increments();
      table.string("name", 150).nullable();
      table.string("username", 80).nullable();
      table.string("provider").nullable();
      table.string("provider_id").nullable();
      table.string("email", 150).nullable().unique();
      table.string("password", 60).nullable();
      table.boolean("is_admin").default(0);
      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
