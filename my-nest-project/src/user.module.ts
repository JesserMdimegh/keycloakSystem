import { Module } from "@nestjs/common";
import { PrismaService } from "./infrastructure/database/prisma.service";
import { PrismaUserRepository } from "./infrastructure/repositories/User.repository";
import { CreateUserUseCase } from "./application/uses-cases/create-user.usecase";
import { UserController } from "./presentation/controller/User.controller";
import { ListUsersUseCase } from "./application/uses-cases/list-users.usecase";
import { GetUserByIdUseCase } from "./application/uses-cases/get-user-by-id.usecase";
import { UpdateUserUseCase } from "./application/uses-cases/update-user.usecase";
import { DeleteUserUseCase } from "./application/uses-cases/delete-user.usecase";

@Module({
    controllers: [UserController],
    providers: [
        PrismaService,
        PrismaUserRepository,
        {
            provide: 'UserRepository',
            useExisting: PrismaUserRepository,
        },
        {
            provide: CreateUserUseCase,
            useFactory: (repo) => new CreateUserUseCase(repo),
            inject: ['UserRepository'],
        },
        {
            provide: ListUsersUseCase,
            useFactory: (repo) => new ListUsersUseCase(repo),
            inject: ['UserRepository'],
        },
        {
            provide: GetUserByIdUseCase,
            useFactory: (repo) => new GetUserByIdUseCase(repo),
            inject: ['UserRepository'],
        },
        {
            provide: UpdateUserUseCase,
            useFactory: (repo) => new UpdateUserUseCase(repo),
            inject: ['UserRepository'],
        },
        {
            provide: DeleteUserUseCase,
            useFactory: (repo) => new DeleteUserUseCase(repo),
            inject: ['UserRepository'],
        }
    ],
    exports: [],
})
export class UserModule {}