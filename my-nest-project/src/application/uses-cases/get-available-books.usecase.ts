import { Book } from "src/domain/entities/Book.entity";
import { BookRepository } from 'src/domain/repositories/book.repository';

export class GetAvailableBooksUseCase {
    constructor(private readonly bookRepository: BookRepository) {}

    async execute(): Promise<Book[]> {
        return await this.bookRepository.findAvailableBooks();
    }
}
