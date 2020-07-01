"use strict";
const User = use("App/Models/User");

class UserController {
  async show({ response }) {
    try {
      const users = await User.all();

      if (users) {
        return users;
      }
      return response.status(400).json({
        status: "error",
        message: "Unable to show users ...",
      });
    } catch (e) {
      console.log(e);
      response.status(500).json({
        status: "error",
        message: "Server error while processing request.",
      });
    }
  }
}

module.exports = UserController;
