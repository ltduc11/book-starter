
import { Body, Delete, Get, HttpCode, JsonController, OnUndefined, Params, Patch, Post } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Service } from 'typedi';
import winston from 'winston';

import { Logger } from '@Decorators/Logger';

import { Publisher } from '@Entities/Publisher';

import { PublisherService } from '@Services/PublisherService';

import { PublisherCreateReq, PublisherUpdateReq } from '@Rests/types/publisher';
import { IdPathParams } from '@Rests/types/IdPathParams';

@Service()
@JsonController('/publisher')
@OpenAPI({ security: [{ BearerToken: [] }] })
export class PublisherController {
  constructor(
    @Logger(module) private readonly logger: winston.Logger,
    private readonly publisherService: PublisherService,
  ) {}

  @Post('/')
  @HttpCode(201)
  async create(@Body() body: PublisherCreateReq) {
    this.logger.info('request :: PublisherCreateReq :', body);
    return this.publisherService.create(body);
  }

  @Get('/:id')
  @ResponseSchema(Publisher)
  public async getById(@Params() params: IdPathParams) {
    const publisher = await this.publisherService.getById(params.id);
    this.logger.info(`publisher by id ${params.id}: `, publisher);
    return publisher;
  }

  @Patch('/:id')
  @ResponseSchema(Publisher)
  public async update(@Params() params: IdPathParams, @Body() body: PublisherUpdateReq) {
    this.logger.info(`update publisher by id: ${params.id} with PublisherUpdateReq: `, body);
    const publisher = await this.publisherService.partialUpdate(params.id, body);
    this.logger.info(`updated publisher by id ${params.id}: `, publisher);
    return publisher;
  }

  @Delete('/:id')
  @HttpCode(204)
  @OnUndefined(204)
  public async delete(@Params() params: IdPathParams) {
    await this.publisherService.delete(params.id);
    return;
  }
}
