import { request } from "../hooks/api";

class AuthService {
  // get user roles
  async getRoles() {
    try {
      const response = await request("roles", "GET", {}, false, false, false);
      return response;
    } catch (error) {
      throw error;
    }
  }



  async updateUserInfo(data, id) {
    try {
      const response = await request(
        `user/${id}`,
        "PUT",
        data,
        true,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getUserViaAccessToken() {
    try {
      const response = await request(
        `token/user`,
        "GET",
        {},
        true,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  // logout
  async logout(data) {
    try {
      const response = await request(
        "logout",
        "POST",
        data,
        false,
        false,
        false,
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}

export default AuthService;
