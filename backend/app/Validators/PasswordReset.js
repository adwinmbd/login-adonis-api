"use strict";

class PasswordReset {
  get rules() {
    return {
      // validation rules
      token: "required",
      password: "required|confirmed",
    };
  }
  get messages() {
    return {
      confirmed: "Woah, {{ field }} doesn't match previous value.",
      required: "Woah, {{ field }} is required.",
    };
  }

  async fails(error) {
    return this.ctx.response.status(403).json({
      status: "error",
      message: error[0].message,
    });
  }
}

module.exports = PasswordReset;
