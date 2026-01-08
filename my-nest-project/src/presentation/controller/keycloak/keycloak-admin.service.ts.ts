import { Injectable, HttpException } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class KeycloakAdminService {
  private readonly baseUrl = process.env.KEYCLOAK_URL;
  private readonly realm = process.env.KEYCLOAK_REALM;

  async getAdminToken(): Promise<string> {
    try {
      console.log("Fetching Keycloak admin token...");
      const response = await axios.post(
        `${this.baseUrl}/realms/${this.realm}/protocol/openid-connect/token`,
        new URLSearchParams({
          grant_type: "client_credentials",
          client_id: process.env.KEYCLOAK_ADMIN_CLIENT_ID!,
          client_secret: process.env.KEYCLOAK_ADMIN_CLIENT_SECRET!,
        }),
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );

      return response.data.access_token;
    } catch (error) {
      throw new HttpException(
        "Failed to fetch Keycloak admin token",
        500
      );
    }
  }
  async createUser(user: {
    username: string;
    email: string;
    password: string;
  }) {

    const token = await this.getAdminToken();

    try {
      console.log("Creating user in Keycloak...");
      await axios.post(
        `${this.baseUrl}/admin/realms/${this.realm}/users`,
        {
          username: user.username,
          email: user.email,
          enabled: true,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log("User created, setting password...");
      const users = await axios.get(
        `${this.baseUrl}/admin/realms/${this.realm}/users?username=${user.username}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const userId = users.data[0].id;
      console.log("Setting password for user in Keycloak...");
      await axios.put(
        `${this.baseUrl}/admin/realms/${this.realm}/users/${userId}/reset-password`,
        {
          type: "password",
          value: user.password,
          temporary: false,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );



    } catch (error) {
      console.error("Keycloak create user error:");

      if (error.response) {
        console.error("Status:", error.response.status);
        console.error("Data:", error.response.data);
        console.error("Headers:", error.response.headers);
      } else {
        console.error("Error message:", error.message);
      }

      throw new HttpException(
        error.response?.data || "Failed to create user",
        error.response?.status || 500
      );
    }

  }

}
