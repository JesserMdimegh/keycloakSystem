import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateBookUseCase } from "src/application/uses-cases/create-book.usecase";
import { ListBookUseCase } from "src/application/uses-cases/list-book.usecase";
import { GetBookByIdUseCase } from "src/application/uses-cases/get-book-by-id.usecase";
import { UpdateBookUseCase } from "src/application/uses-cases/update-book.usecase";
import { DeleteBookUseCase } from "src/application/uses-cases/delete-book.usecase";
import { GetAvailableBooksUseCase } from "src/application/uses-cases/get-available-books.usecase";
import { Book } from "src/domain/entities/Book.entity";
import { CreateBookDto } from "../../application/dto/create-book.dto";
import { UpdateBookDto } from "../../application/dto/update-book.dto";

@Controller('books')
export class BookController {
    constructor(
        private readonly createBook: CreateBookUseCase,
        private readonly listBooks: ListBookUseCase,
        private readonly getBookById: GetBookByIdUseCase,
        private readonly updateBook: UpdateBookUseCase,
        private readonly deleteBook: DeleteBookUseCase,
        private readonly getAvailableBooks: GetAvailableBooksUseCase
    ) {}
    
    @Get()
    getBooks(): Promise<Book[]> {
        return this.listBooks.execute();
    }

    @Get('available')
    getAvailableBooksEndpoint(): Promise<Book[]> {
        return this.getAvailableBooks.execute();
    }

    @Get(':id')
    getBook(@Param('id') id: string): Promise<Book | null> {
        return this.getBookById.execute(id);
    }

    @Post()
    create(@Body() dto: CreateBookDto): Promise<Book> {
        return this.createBook.execute(dto.title, dto.author);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() dto: UpdateBookDto): void {
         this.updateBook.execute(id, dto.title, dto.author, dto.isAvailable);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<void> {
        return this.deleteBook.execute(id);
    }
} 