import { Inject, Service } from 'typedi';
import { DataSource, DeepPartial } from 'typeorm';
import winston from 'winston';

import { Logger } from '@Decorators/Logger';

import { Publisher } from '@Entities/Publisher';

import { BaseOrmRepository } from '@Repositories/BaseOrmRepository';

@Service()
export class PublisherRepository extends BaseOrmRepository<Publisher> {
  constructor(
    @Logger(module) private logger: winston.Logger,
    @Inject('dataSource') private dataSource: DataSource,
  ) {
    super(dataSource, Publisher);
  }

  async create(publisher: DeepPartial<Publisher>) { // NOTE difference with Partial ?
    return this.repo.save(publisher);
  }

  async findById(id: number) {
    return this.repo.findOneBy({ id });
  }

  async partialUpdate(id: number, publisher: DeepPartial<Publisher>) {
    return this.repo.createQueryBuilder()
      .update(publisher)
      .where({ id })
      .returning(['name', 'id', 'address', 'email', 'ownerName', 'phoneNumber'])
      .execute();
  }

  async delete(id: number) {
    return this.repo.delete({ id });
  }
}
