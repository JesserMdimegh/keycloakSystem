import { Book } from "src/domain/entities/Book.entity";
import { BookRepository } from "src/domain/repositories/book.repository";

export class CreateBookUseCase {
    constructor(private readonly bookRepository: BookRepository) {}
    async execute(title: string, author: string): Promise<Book> {
        const newBook: Book = { id: '', title, author, isAvailable: true };
         await this.bookRepository.save(newBook);
         return newBook;
    }
}