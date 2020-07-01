"use strict";

class SendLink {
  get rules() {
    return {
      // validation rules
      email: "required|email",
    };
  }
  get messages() {
    return {
      email: "Woah, {{ field }} is not in good format.",
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

module.exports = SendLink;
