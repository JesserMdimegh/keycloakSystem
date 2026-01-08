import { Author } from "src/domain/entities/Author.entity";
import { AuthorRepository } from 'src/domain/repositories/Author.repository';

export class FindAuthorByNameUseCase {
    constructor(private readonly authorRepository: AuthorRepository) {}

    async execute(name: string): Promise<Author | null> {
        return await this.authorRepository.findAuthorByName(name);
    }
}
