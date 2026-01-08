import { Module } from '@nestjs/common';
import { BookController } from './presentation/controller/book.controller';
import { CreateBookUseCase } from './application/uses-cases/create-book.usecase';
import { ListBookUseCase } from './application/uses-cases/list-book.usecase';
import { GetBookByIdUseCase } from './application/uses-cases/get-book-by-id.usecase';
import { UpdateBookUseCase } from './application/uses-cases/update-book.usecase';
import { DeleteBookUseCase } from './application/uses-cases/delete-book.usecase';
import { GetAvailableBooksUseCase } from './application/uses-cases/get-available-books.usecase';
import { PrismaService } from './infrastructure/database/prisma.service';
import { PrismaBookRepository } from './infrastructure/repositories/prisma-book.repository';

@Module({
    controllers: [BookController],
    providers: [
        PrismaService,
        PrismaBookRepository,
        {
            provide: 'BookRepository',
            useExisting: PrismaBookRepository,
        },
        {
            provide: CreateBookUseCase,
            useFactory: (repo) => new CreateBookUseCase(repo),
            inject: ['BookRepository'],
        },
        {
            provide: ListBookUseCase,
            useFactory: (repo) => new ListBookUseCase(repo),
            inject: ['BookRepository'],
        },
        {
            provide: GetBookByIdUseCase,
            useFactory: (repo) => new GetBookByIdUseCase(repo),
            inject: ['BookRepository'],
        },
        {
            provide: UpdateBookUseCase,
            useFactory: (repo) => new UpdateBookUseCase(repo),
            inject: ['BookRepository'],
        },
        {
            provide: DeleteBookUseCase,
            useFactory: (repo) => new DeleteBookUseCase(repo),
            inject: ['BookRepository'],
        },
        {
            provide: GetAvailableBooksUseCase,
            useFactory: (repo) => new GetAvailableBooksUseCase(repo),
            inject: ['BookRepository'],
        },
    ],
})
export class BookModule {}