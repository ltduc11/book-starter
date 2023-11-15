import { Service } from 'typedi';
import winston from 'winston';

import { Logger } from '@Decorators/Logger';

import { Book } from '@Entities/Book';

import { BookRepository } from '@Repositories/BookRepository';

import { BookCreateReq, BookUpdateReq } from '@Rests/types/book';

@Service()
export class BookService {
  constructor(
    @Logger(module) private readonly logger: winston.Logger,
    private readonly bookRepo: BookRepository,
  ) { }

  public async create(bookReq: BookCreateReq) {
    const book = new Book();
    book.name = bookReq.name;
    book.type = bookReq.type;
    book.publishYear = bookReq.publishYear;
    // book.publisher = bookReq.publisher;
    // book.authors = bookReq.authors;
    const createdBook = await this.bookRepo.create(book);
    this.logger.info('create:: createdBook: ', createdBook);
    return createdBook;
  }

  public async getById(id: number) {
    return this.bookRepo.findById(id);
  }

  public async partialUpdate(id: number, book: BookUpdateReq) {
    const updated = await this.bookRepo.partialUpdate(id, book);
    return updated?.raw?.[0];
  }

  public async delete(id: number) {
    return this.bookRepo.delete(id);
  }
}
