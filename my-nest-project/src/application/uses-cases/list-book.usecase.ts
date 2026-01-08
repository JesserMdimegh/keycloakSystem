import { BookRepository } from "src/domain/repositories/book.repository";
import { Book } from "src/domain/entities/Book.entity";

export class ListBookUseCase {
    constructor(private readonly bookRepo: BookRepository) {}

    async execute(): Promise<Book[]> {
        const books = await this.bookRepo.findAll();
        return books;
    }
}