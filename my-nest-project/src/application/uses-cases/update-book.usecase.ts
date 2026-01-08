import { Book } from "src/domain/entities/Book.entity";
import { BookRepository } from 'src/domain/repositories/book.repository';

export class UpdateBookUseCase {
    constructor(private readonly bookRepository: BookRepository) {}

    async execute(id: string, title: string, author: string, isAvailable: boolean): Promise<void> {
        const existingBook = await this.bookRepository.findById(id);
        if (!existingBook) {
            throw new Error(`Book with id '${id}' not found`);
        }

        await this.bookRepository.updateBook(id, title, author, isAvailable);
    }
}
