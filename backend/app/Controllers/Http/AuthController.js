"use strict";
const Env = use("Env");
const User = use("App/Models/User");

class AuthController {
  // Register user
  async register({ request, auth, response }) {
    const userData = request.only(["username", "email", "password"]);

    try {
      const user = await User.create(userData);

      if (user) {
        const token = await auth.generate(user);

        // return response.ok({ token })
        return response.status(200).json({
          status: "success",
          data: token,
        });
      }
      return response.status(400).json({
        status: "error",
        message: "Unable to create exisiting user.",
      });
    } catch (e) {
      console.log(e);
      return response.status(500).json({
        status: "error",
        message: "Server unable to register user.",
      });
    }
  }

  // Login user
  async login({ request, auth, response }) {
    const { email, password } = request.only(["email", "password"]);

    try {
      const token = await auth.attempt(email, password);

      if (token) {
        // return response.ok({ token })
        return response.status(200).json({
          status: "success",
          data: token,
        });
      }
      return response.status(400).json({
        status: "error",
        message: "Invalid email/password.",
      });
    } catch (e) {
      console.log(e);
      return response.status(500).json({
        status: "error",
        message: "Server unable to login user.",
      });
    }
  }

  // Show user profile
  async getAuthUser({ auth, response }) {
    const daUser = auth.user.$originalAttributes;
    const {
      id,
      name,
      password,
      provider,
      provider_id,
      ...authUserClone
    } = daUser;
    // return authUserClone;
    return response.status(200).json({
      status: "success",
      data: authUserClone,
    });
  }

  /***** Redirect to Social Login Provider *****/
  async redirectToProvider({ ally, params }) {
    await ally.driver(params.provider).redirect();
  }

  /***** Social Login Provider succesful response *****/
  async handleProviderCallback({ auth, params, ally, response }) {
    const provider = params.provider;
    try {
      const userData = await ally.driver(params.provider).getUser();

      // user details to be saved
      const userDetails = {
        username: userData.getName(),
        email: userData.getEmail(),
        provider_id: userData.getId(),
        provider: provider,
        // token: userData.getAccessToken(),
      };

      // search for existing user
      const whereClause = {
        email: userData.getEmail(),
      };

      const user = await User.findOrCreate(whereClause, userDetails);
      // const token = userData.getAccessToken();
      const data = await auth.generate(user);

      /*const daUser = auth.user.$originalAttributes;
      const { password, id, ...authUserClone } = daUser;
      const obj = { test: 5 };
      const anadaWan = { ...obj, ...authUserClone };*/

      if (data) {
        return response.redirect(
          `${Env.get("WEB_URL")}/callback?token=${data.token}`
        );
      }

      return response.status(400).json({
        status: "error",
        message: "Invalid email/password.",
      });
    } catch (e) {
      console.log(e);
      return response.status(500).json({
        status: "error",
        message: "Server unable to login user.",
      });
    }
  }
  /***** Front Social Login processing *****/
  async handleSocialCallback({ auth, response, request }) {
    const userInfo = request.all();
    try {
      const SocialUser = {
        email: userInfo.email,
        username: userInfo.name,
        provider_id: userInfo.provider_id,
        provider: userInfo.provider,
      };

      // search for existing user
      const whereClause = {
        email: userInfo.email,
      };

      const user = await User.findOrCreate(whereClause, SocialUser);
      // const token = await auth.generate(user);
      const token = userInfo.getAccessToken();

      if (token) {
        return response.status(200).json({
          status: "success",
          data: token,
        });
      }

      return response.status(400).json({
        status: "error",
        message: "Invalid email/password.",
      });
    } catch (e) {
      console.log(e);
      return response.status(500).json({
        status: "error",
        message: "Server unable to login user.",
      });
    }
  }
}

module.exports = AuthController;
