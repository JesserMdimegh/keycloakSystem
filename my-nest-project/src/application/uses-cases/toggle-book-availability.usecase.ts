import { BookRepository } from 'src/domain/repositories/book.repository';

export class ToggleBookAvailabilityUseCase {
    constructor(private readonly bookRepository: BookRepository) {}

    async execute(id: string): Promise<void> {
        const existingBook = await this.bookRepository.findById(id);
        if (!existingBook) {
            throw new Error(`Book with id '${id}' not found`);
        }

        // Toggle the availability
        existingBook.isAvailable = !existingBook.isAvailable;
        await this.bookRepository.save(existingBook);
    }
}
