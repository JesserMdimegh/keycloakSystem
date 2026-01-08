import { Author } from "../entities/Author.entity";

export interface AuthorRepository {
    createAuthor(author: Omit<Author, 'id'>): Promise<Author>;
    findAuthorById(id: string): Promise<Author | null>;
    findAllAuthors(): Promise<Author[]>;
    updateAuthor(id: string, data: Partial<Omit<Author, 'id'>>): Promise<Author>;
    deleteAuthor(id: string): Promise<void>;
    findAuthorByName(name: string): Promise<Author | null>;
    findAuthorsByBookTitle(title: string): Promise<Author[]>;
}