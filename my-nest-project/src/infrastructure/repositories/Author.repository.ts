import { Injectable } from "@nestjs/common";
import { PrismaService } from "../database/prisma.service";
import { AuthorRepository } from "../../domain/repositories/Author.repository";
import { Author } from "src/domain/entities/Author.entity";

@Injectable()
export class PrismaAuthorRepository implements AuthorRepository {
    constructor(private readonly prisma: PrismaService) {}
    findAuthorsByBookTitle(title: string): Promise<Author[]> {
        throw new Error("Method not implemented.");
    }

    async createAuthor(author: Omit<Author, 'id'>): Promise<Author> {
        const createdAuthor = await this.prisma.author.create({
            data: {
                name: author.name
            }
        });

        return new Author(createdAuthor.id, createdAuthor.name);
    }

    async findAuthorById(id: string): Promise<Author | null> {
        const author = await this.prisma.author.findUnique({ where: { id } });
        return author
            ? new Author(author.id, author.name)
            : null;
    }

    async findAllAuthors(): Promise<Author[]> {
        const authors = await this.prisma.author.findMany();
        return authors.map(
            b => new Author(b.id, b.name), 
        );
    }

    async updateAuthor(id: string, data: Partial<Omit<Author, 'id'>>): Promise<Author> {
        const updatedAuthor = await this.prisma.author.update({
            where: { id },
            data: {
                name: data.name
            }
        });

        return new Author(updatedAuthor.id, updatedAuthor.name);
    }

    async deleteAuthor(id: string): Promise<void> {
        await this.prisma.author.delete({ where: { id } });
    }

    async findAuthorByName(name: string): Promise<Author | null> {
        const author = await this.prisma.author.findFirst({ where: { name } });
        return author
            ? new Author(author.id, author.name)
            : null;
    }
}