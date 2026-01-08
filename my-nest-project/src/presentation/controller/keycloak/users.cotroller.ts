import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { KeycloakAdminService } from "./keycloak-admin.service.ts";
import { Public } from "src/infrastructure/auth/public.decorator";
@UseGuards()
@Controller("keycloak/")
export class UsersController {
  constructor(private readonly keycloak: KeycloakAdminService) {}
  @Public()
  @Post('users')
  async createUser(
    @Body()
    body: { username: string; email: string; password: string }
  ) {
    await this.keycloak.createUser(body);
    return { message: "User created successfully" };
  }
  @Public()
  @Post('token')
  async getToken() {
    console.log("Getting admin token...");
    const token =  await this.keycloak.getAdminToken();
    return { token };
  }
}
