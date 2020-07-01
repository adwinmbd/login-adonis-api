"use strict";

const { hooks } = require("@adonisjs/ignitor");

hooks.after.providersBooted(() => {
  const View = use("Adonis/Src/View");

  View.global("appUrl", (path) => {
    const Env = use("Env");

    const APP_URL = Env.get("APP_URL");

    return path ? `${APP_URL}/${path}` : APP_URL;
  });

  View.global("webUrl", (path) => {
    const Env = use("Env");

    const WEB_URL = Env.get("WEB_URL");

    return path ? `${WEB_URL}/${path}` : WEB_URL;
  });

  View.global("encodeURIComponent", (token) => {
    return encodeURIComponent(token);
  });
});
