import { AuthorRepository } from "src/domain/repositories/Author.repository";
import { Author } from "src/domain/entities/Author.entity";

export class ListAuthorUseCase {
    constructor(private readonly authorRepository: AuthorRepository) {}
    async execute(): Promise<Author[]> {
        const authors = await this.authorRepository.findAllAuthors();
        return authors;
    }
}