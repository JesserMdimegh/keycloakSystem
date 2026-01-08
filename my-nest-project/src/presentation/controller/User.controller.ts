import { Controller, Get, Post, Put, Delete, Param, Body } from "@nestjs/common";
import { CreateUserUseCase } from "src/application/uses-cases/create-user.usecase";
import { ListUsersUseCase } from "src/application/uses-cases/list-users.usecase";
import { GetUserByIdUseCase } from "src/application/uses-cases/get-user-by-id.usecase";
import { UpdateUserUseCase } from "src/application/uses-cases/update-user.usecase";
import { DeleteUserUseCase } from "src/application/uses-cases/delete-user.usecase";
import { User } from "src/domain/entities/User.entity";
import { CreateUserDto } from "../../application/dto/create-user.dto";
import { UpdateUserDto } from "../../application/dto/update-user.dto";
import { UseGuards } from "@nestjs/common";
import { RolesGuard } from "src/infrastructure/auth/roles.guard";
import { Roles } from "src/infrastructure/auth/public.decorator";
import { Public } from "src/infrastructure/auth/public.decorator";
@UseGuards(RolesGuard)
@Controller('users')
export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly listUsersUseCase: ListUsersUseCase,
        private readonly getUserByIdUseCase: GetUserByIdUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase,
    ) {}
    @Public()
    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.listUsersUseCase.execute();
    }
    @Roles('admin')
    @Get(':id')
    async getUserById(@Param('id') id: string): Promise<User | null> {
        return this.getUserByIdUseCase.execute(id);
    }
    @Roles('admin')
    @Post()
    async createUser(@Body() dto: CreateUserDto): Promise<User> {
        return this.createUserUseCase.execute(dto);
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() dto: UpdateUserDto): Promise<User> {
        return this.updateUserUseCase.execute(id, dto.name, dto.email);
    }
    @Roles('admin')
    @Delete(':id')
    async deleteUser(@Param('id') id: string): Promise<void> {
        return this.deleteUserUseCase.execute(id);
    }
}