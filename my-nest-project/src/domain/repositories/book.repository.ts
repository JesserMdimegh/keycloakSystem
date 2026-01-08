import { Book } from '../entities/Book.entity';
export interface BookRepository {
findAll(): Promise<Book[]>;
findById(id: string): Promise<Book | null>;
findByTitle(title: string): Promise<Book | null>;
findByAuthor(authorName: string): Promise<Book[]>;
findAvailableBooks(): Promise<Book[]>;
save(book: Book): Promise<void>;
delete(id: string): Promise<void>;
toggleAvailability(id: string): Promise<void>;
findBookByTitle(title: string): Promise<Book | null>;
updateBook(id: string, title: string, author: string, isAvailable: boolean): Promise<void>;
deleteBook(id: string): Promise<void>;






}