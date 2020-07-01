"use strict";
const User = use("App/Models/User");

class AdminController {
  show({ auth, response }) {
    if (auth.user.is_admin) {
      // response.redirect("/");
      return response.status(200).json({
        status: "success",
        message: "secret message ONLY for admin.",
      });
    }
    return response.status(400).json({
      status: "error",
      message: "Unauthorized access.",
    });
  }
}

module.exports = AdminController;
