"use strict";

const Event = use("Event");
const Mail = use("Mail");

Event.on("forgot::password", async (data) => {
  try {
    await Mail.send("emails.recover", data, (message) => {
      message
        .to(data.user.email)
        .from("hello@sadoauth.com")
        .subject("Password reset request.");
    });
  } catch (e) {
    console.log(e);
    return response.status(400).json({
      status: "error",
      message: "Server unable to process request.",
    });
  }
});

Event.on("password::reset", async (data) => {
  try {
    await Mail.send("emails.reset", data, (message) => {
      message
        .to(data.user.email)
        .from("hello@sadoauth.com")
        .subject("Password reset succesful.");
    });
  } catch (e) {
    console.log(e);
    return response.status(400).json({
      status: "error",
      message: "Server unable to process request.",
    });
  }
});
