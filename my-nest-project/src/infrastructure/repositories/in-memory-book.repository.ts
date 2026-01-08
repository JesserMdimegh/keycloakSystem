import { BookRepository } from '../../domain/repositories/book.repository';
import { Book } from '../../domain/entities/Book.entity';


/*export class InMemoryBookRepository implements BookRepository {
private books: Book[] = [];


async findAll(): Promise<Book[]> {
return this.books;
}


async findById(id: string): Promise<Book | null> {
return this.books.find(b => b.id === id) ?? null;
}


async save(book: Book): Promise<void> {
this.books.push(book);
}
}*/