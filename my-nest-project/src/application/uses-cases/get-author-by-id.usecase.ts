import { Author } from "src/domain/entities/Author.entity";
import { AuthorRepository } from "src/domain/repositories/Author.repository";

export class GetAuthorByIdUseCase {
    constructor(private readonly authorRepository: AuthorRepository) {}

    async execute(id: string): Promise<Author | null> {
        return await this.authorRepository.findAuthorById(id);
    }
}
