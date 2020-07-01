"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
// const InvalidAccessException = use("App/Exceptions/InvalidAccessException");

class Admin {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ auth, response, request }, next) {
    // call next to advance the request
    await auth.check();
    if (auth.user.is_admin !== 1) {
      return response.forbidden();
    }
    await next();
  }
}

module.exports = Admin;
