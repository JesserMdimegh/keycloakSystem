import { AuthorRepository } from 'src/domain/repositories/Author.repository';

export class DeleteAuthorUseCase {
    constructor(private readonly authorRepository: AuthorRepository) {}

    async execute(id: string): Promise<void> {
        const existingAuthor = await this.authorRepository.findAuthorById(id);
        if (!existingAuthor) {
            throw new Error(`Author with id '${id}' not found`);
        }

        await this.authorRepository.deleteAuthor(id);
    }
}
