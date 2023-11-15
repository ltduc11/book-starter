import { Inject, Service } from 'typedi';
import { DataSource, DeepPartial } from 'typeorm';
import winston from 'winston';

import { Logger } from '@Decorators/Logger';

import { Author } from '@Entities/Author';

import { BaseOrmRepository } from '@Repositories/BaseOrmRepository';

@Service()
export class AuthorRepository extends BaseOrmRepository<Author> {
  constructor(
    @Logger(module) private logger: winston.Logger,
    @Inject('dataSource') private dataSource: DataSource,
  ) {
    super(dataSource, Author);
  }

  async create(author: DeepPartial<Author>) {
    return this.repo.save(author);
  }

  async findById(id: number) {
    return this.repo.findOneBy({ id });

    //FIXME
    // return this.repo.findOne({
    //   where: { id }, relations: ['books'],
    // });
  }

  async partialUpdate(id: number, author: DeepPartial<Author>) {
    return this.repo.createQueryBuilder()
      .update(author)
      .where({ id })
      .returning(['name', 'id', 'gender', 'birthday']) //, 'books'
      .execute();
  }

  async delete(id: number) {
    return this.repo.delete({ id });
  }
}
