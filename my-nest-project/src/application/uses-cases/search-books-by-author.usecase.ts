import { Book } from "src/domain/entities/Book.entity";
import { BookRepository } from 'src/domain/repositories/book.repository';

export class SearchBooksByAuthorUseCase {
    constructor(private readonly bookRepository: BookRepository) {}

    async execute(authorName: string): Promise<Book[]> {
        return await this.bookRepository.findByAuthor(authorName);
    }
}
