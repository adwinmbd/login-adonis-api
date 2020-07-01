"use strict";

const Factory = use("Factory");
const User = use("App/Models/User");
const { test, trait } = use("Test/Suite")("Authentication");

trait("Test/ApiClient");

test("a JWT is generated for a logged in user", async ({ assert, client }) => {
  // generate a fake user
  const { username, email, password } = await Factory.model(
    "App/Models/User"
  ).make();

  // save the fake user to the database
  await User.create({
    username,
    email,
    password,
  });

  // make api request to login the user
  const response = await client
    .post("api/login")
    .send({
      email,
      password,
    })
    .end();
  // console.log("error", response.error);
  // assert the status is 200
  response.assertStatus(200);

  // assert the status is succesful in the response
  response.assertJSONSubset({
    status: "success",
  });
  // assert the token is in the response
  assert.isDefined(response.body.data.token);
});
