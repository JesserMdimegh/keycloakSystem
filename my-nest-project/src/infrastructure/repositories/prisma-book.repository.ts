import { BookRepository } from '../../domain/repositories/book.repository';
import { Book } from '../../domain/entities/Book.entity';
import { PrismaService } from '../database/prisma.service';
import { Injectable } from '@nestjs/common';
@Injectable()
export class PrismaBookRepository implements BookRepository {
  constructor(private readonly prisma: PrismaService) {}
  findAvailableBooks(): Promise<Book[]> {
    return this.findAvailable();
  }
  
  async findBookByTitle(title: string): Promise<Book | null> {
    return this.findByTitle(title);
  }
  

  async findAll(): Promise<Book[]> {
    const books = await this.prisma.book.findMany({
      include: { author: true }
    });
    return books.map(
      b => new Book(b.id, b.title, b.author.name, b.isAvailable),
    );
  }

  async findById(id: string): Promise<Book | null> {
    const book = await this.prisma.book.findUnique({ 
      where: { id },
      include: { author: true }
    });
    return book
      ? new Book(book.id, book.title, book.author.name, book.isAvailable)
      : null;
  }

  async findByTitle(title: string): Promise<Book | null> {
    const book = await this.prisma.book.findFirst({ 
      where: { title },
      include: { author: true }
    });
    return book
      ? new Book(book.id, book.title, book.author.name, book.isAvailable)
      : null;
  }

  async findByAuthor(authorName: string): Promise<Book[]> {
    const books = await this.prisma.book.findMany({
      where: { 
        author: { 
          name: authorName 
        } 
      },
      include: { author: true }
    });
    return books.map(
      b => new Book(b.id, b.title, b.author.name, b.isAvailable),
    );
  }
  
  async findAvailable(): Promise<Book[]> {
    const books = await this.prisma.book.findMany({
      where: { isAvailable: true },
      include: { author: true }
    });
    return books.map(
      b => new Book(b.id, b.title, b.author.name, b.isAvailable),
    );
  }

  async save(book: Book): Promise<void> {
    // Find author by name first
    const author = await this.prisma.author.findFirst({
      where: { id: book.author }
    });
    
    if (!author) {
      throw new Error(`Author with id '${book.author}' not found`);
    }

    await this.prisma.book.upsert({
      where: { id: book.id },
      update: {
        title: book.title,
        authorId: author.id,
        isAvailable: book.isAvailable,
      },
      create: {
        id: book.id,
        title: book.title,
        authorId: author.id,
        isAvailable: book.isAvailable,
      },
    });
  }

  async delete(id: string) : Promise<void> {
    await this.prisma.book.delete({ where: { id } });
  }
  
  async deleteBook(id: string): Promise<void> {
    await this.delete(id);
  }
  async updateBook(id: string, title: string, author: string, isAvailable: boolean): Promise<void> {
    // Find or create the author
    let authorRecord = await this.prisma.author.findFirst({
      where: { name: author }
    });

    if (!authorRecord) {
      authorRecord = await this.prisma.author.create({
        data: { name: author }
      });
    }

    // Update the book
    await this.prisma.book.update({
      where: { id },
      data: {
        title,
        authorId: authorRecord.id,
        isAvailable
      }
    });
  }
  async toggleAvailability(id: string): Promise<void> {
    const book = await this.findById(id);
    if (!book) {
      throw new Error(`Book with id '${id}' not found`);
    }
    await this.prisma.book.update({
      where: { id },
      data: { isAvailable: !book.isAvailable }
    });
  }
}
