import { Book } from "src/domain/entities/Book.entity";
import { BookRepository } from 'src/domain/repositories/book.repository';

export class FindBookByTitleUseCase {
    constructor(private readonly bookRepository: BookRepository) {}

    async execute(title: string): Promise<Book | null> {
        return await this.bookRepository.findBookByTitle(title);
    }
}
