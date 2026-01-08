import { Author } from "src/domain/entities/Author.entity";
import { AuthorRepository } from "src/domain/repositories/Author.repository";

export class CreateAuthorUseCase {
    constructor(private readonly authorRepository: AuthorRepository) {}
    async execute(name: string): Promise<Author> {
        const newAuthor = { name };
        return await this.authorRepository.createAuthor(newAuthor);
    }
}