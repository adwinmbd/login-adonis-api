"use strict";
// const { validate, validateAll } = use("Validator");
const User = use("App/Models/User");
const Token = use("App/Models/Token");
const Encryption = use("Encryption");
const Event = use("Event");

class PasswordResetController {
  async sendResetLink({ request, response }) {
    /*
    const rules = { email: "required|email" };
    const messages = {
      email: "Woah, {{ field }} is not in good format.",
      required: "Woah, {{ field }} is required.",
    };
    */

    const userData = request.input(["email"]);
    /*
    const validation = await validate(userData, rules, messages);

    if (validation.fails()) {
      return response.status(400).json({
        status: "error",
        message: validation.messages()[0].message,
      });
    }
    */

    try {
      const user = await User.findBy("email", userData);

      if (user) {
        const randomString = [...Array(12)]
          .map((i) => (~~(Math.random() * 36)).toString(36).toUpperCase())
          .join("");

        await Token.query()
          .where("user_id", user.id)
          .where("type", "password")
          .delete();

        const token = new Token();
        token.token = Encryption.encrypt(randomString);
        token.type = "password";

        const foundUserToken = await user.tokens().save(token);

        if (foundUserToken) {
          Event.fire("forgot::password", {
            user: user.toJSON(),
            token: token.token,
            // member: user
          });

          return response.status(200).json({
            status: "success",
            message: "Please check your e-mail for the reset link.",
          });
        }

        return response.status(400).json({
          status: "error",
          message: "Unable to generate reset link.",
        });
      }
      return response.status(400).json({
        status: "error",
        message: "The user doesn't exist.",
      });
    } catch (e) {
      console.log(e);
      return response.status(500).json({
        status: "error",
        message: "Server unable to process request.",
      });
    }
  }

  async updatePassword({ request, response }) {
    const formData = request.all();

    try {
      const token = await Token.query()
        .where("token", decodeURIComponent(formData.token))
        .where("type", "password")
        .first();

      if (token) {
        const user = await User.find(token.user_id);

        user.password = formData.password;
        await user.save();

        await token.delete();

        Event.fire("password::reset", { user: user.toJSON() /*member: user*/ });

        return response.status(200).json({
          status: "success",
          message: "Your password has been changed!",
        });
      }
      return response.status(400).json({
        status: "error",
        message: "The reset token doesn't exist.",
      });
    } catch (e) {
      console.log(e);
      return response.status(500).json({
        status: "error",
        message: "Server unable to process request.",
      });
    }
  }
}

module.exports = PasswordResetController;
