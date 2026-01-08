import { Author } from "src/domain/entities/Author.entity";
import { AuthorRepository } from 'src/domain/repositories/Author.repository';

export class UpdateAuthorUseCase {
    constructor(private readonly authorRepository: AuthorRepository) {}

    async execute(id: string, name: string): Promise<Author> {
        const existingAuthor = await this.authorRepository.findAuthorById(id);
        if (!existingAuthor) {
            throw new Error(`Author with id '${id}' not found`);
        }

        const updateData = { name };
        return await this.authorRepository.updateAuthor(id, updateData);
    }
}
