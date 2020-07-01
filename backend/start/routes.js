"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.get("/", () => {
  return { greeting: "Hello world in JSON" };
});

Route.get("demo/users", "UserController.show");

// Route.get("auth/social", "AuthController.handleSocialCallback");
// Route.get("auth/:provider", "AuthController.redirectToProvider");
// Route.get("authenticated/:provider", "AuthController.handleProviderCallback");

Route.group(() => {
  Route.post("login", "AuthController.login");
  Route.post("register", "AuthController.register");
  Route.get("auser", "AuthController.getAuthUser").middleware(["auth"]);
  Route.get("auth/social", "AuthController.handleSocialCallback");
  Route.get("auth/:provider", "AuthController.redirectToProvider");
  Route.get("authenticated/:provider", "AuthController.handleProviderCallback");
}).prefix("api");

Route.group(() => {
  Route.post(
    "password/email",
    "PasswordResetController.sendResetLink"
  ).validator("SendLink");
  Route.put(
    "password/reset",
    "PasswordResetController.updatePassword"
  ).validator("PasswordReset");
}).prefix("api");

Route.group(() => {
  Route.get("admin/secret", "AdminController.show").middleware([
    "auth",
    "admin",
  ]);
}).prefix("api");
