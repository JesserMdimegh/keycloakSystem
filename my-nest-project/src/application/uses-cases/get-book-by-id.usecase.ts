import { Book } from "src/domain/entities/Book.entity";
import { BookRepository } from "src/domain/repositories/book.repository";

export class GetBookByIdUseCase {
    constructor(private readonly bookRepository: BookRepository) {}

    async execute(id: string): Promise<Book | null> {
        return await this.bookRepository.findById(id);
    }
}
