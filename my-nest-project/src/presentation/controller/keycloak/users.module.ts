import { Module } from "@nestjs/common";
import { UsersController } from "./users.cotroller";
import { KeycloakAdminService } from "./keycloak-admin.service.ts";

@Module({
  controllers: [UsersController],
  providers: [KeycloakAdminService],
})
export class UsersModule {}
