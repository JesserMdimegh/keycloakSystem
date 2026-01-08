import { Module } from "@nestjs/common";
import { PrismaService } from "./infrastructure/database/prisma.service";
import { PrismaAuthorRepository } from "./infrastructure/repositories/Author.repository";
import { AuthorController } from "./presentation/controller/Author.controller";
import { ListAuthorUseCase } from "./application/uses-cases/list-author.usecase";
import { CreateAuthorUseCase } from "./application/uses-cases/create-author.usecase";
import { GetAuthorByIdUseCase } from "./application/uses-cases/get-author-by-id.usecase";
import { UpdateAuthorUseCase } from "./application/uses-cases/update-author.usecase";
import { DeleteAuthorUseCase } from "./application/uses-cases/delete-author.usecase";

@Module({
    controllers: [AuthorController],
    providers: [
        PrismaService,
        PrismaAuthorRepository,
        {
            provide: 'AuthorRepository',
            useExisting: PrismaAuthorRepository,
        },
        {
            provide: ListAuthorUseCase,
            useFactory: (repo) => new ListAuthorUseCase(repo),
            inject: ['AuthorRepository'],
        },
        {
            provide: CreateAuthorUseCase,
            useFactory: (repo) => new CreateAuthorUseCase(repo),
            inject: ['AuthorRepository'],
        },
        {
            provide: GetAuthorByIdUseCase,
            useFactory: (repo) => new GetAuthorByIdUseCase(repo),
            inject: ['AuthorRepository'],
        },
        {
            provide: UpdateAuthorUseCase,
            useFactory: (repo) => new UpdateAuthorUseCase(repo),
            inject: ['AuthorRepository'],
        },
        {
            provide: DeleteAuthorUseCase,
            useFactory: (repo) => new DeleteAuthorUseCase(repo),
            inject: ['AuthorRepository'],
        },
    ],
})
export class AuthorModule {}