import { Service } from 'typedi';
import winston from 'winston';

import { Logger } from '@Decorators/Logger';

import { Author } from '@Entities/Author';

import { AuthorRepository } from '@Repositories/AuthorRepository';

import { AuthorCreateReq, AuthorUpdateReq } from '@Rests/types/author';

@Service()
export class AuthorService {
  constructor(
    @Logger(module) private readonly logger: winston.Logger,
    private readonly authorRepo: AuthorRepository,
  ) { }

  public async create(authorReq: AuthorCreateReq) {
    const author = new Author();
    author.name = authorReq.name;
    author.gender = authorReq.gender;
    author.birthday = authorReq.birthday;
    // author.books = authorReq.books;
    const createdAuthor = await this.authorRepo.create(author);
    this.logger.info('create:: createdAuthor: ', createdAuthor);
    return createdAuthor;
  }

  public async getById(id: number) {
    return this.authorRepo.findById(id);
  }

  public async partialUpdate(id: number, author: AuthorUpdateReq) {
    const updated = await this.authorRepo.partialUpdate(id, author);
    return updated?.raw?.[0];
  }

  public async delete(id: number) {
    return this.authorRepo.delete(id);
  }
}
