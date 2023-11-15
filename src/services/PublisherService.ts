import { Service } from 'typedi';
import winston from 'winston';

import { Logger } from '@Decorators/Logger';

import { Publisher } from '@Entities/Publisher';

import { PublisherRepository } from '@Repositories/PublisherRepository';

import { PublisherCreateReq, PublisherUpdateReq } from '@Rests/types/publisher';

@Service()
export class PublisherService {
  constructor(
    @Logger(module) private readonly logger: winston.Logger,
    private readonly publisherRepo: PublisherRepository,
  ) { }

  public async create(publisherReq: PublisherCreateReq) {
    const publisher = new Publisher();
    publisher.name = publisherReq.name;
    publisher.address = publisherReq.address;
    publisher.email = publisherReq.email;
    publisher.ownerName = publisherReq.ownerName;
    publisher.phoneNumber = publisherReq.phoneNumber;
    const createdPublisher = await this.publisherRepo.create(publisher);
    this.logger.info('create:: createdPublisher: ', createdPublisher);
    return createdPublisher;
  }

  public async getById(id: number) {
    return this.publisherRepo.findById(id);
  }

  public async partialUpdate(id: number, publisher: PublisherUpdateReq) {
    const updated = await this.publisherRepo.partialUpdate(id, publisher);
    return updated?.raw?.[0];
  }

  public async delete(id: number) {
    return this.publisherRepo.delete(id);
  }
}
