
import { Body, Delete, Get, HttpCode, JsonController, OnUndefined, Params, Patch, Post } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Service } from 'typedi';
import winston from 'winston';

import { Logger } from '@Decorators/Logger';

import { Author } from '@Entities/Author';

import { AuthorService } from '@Services/AuthorService';

import { AuthorCreateReq, AuthorUpdateReq } from '@Rests/types/author';
import { IdPathParams } from '@Rests/types/IdPathParams';

@Service()
@JsonController('/author')
@OpenAPI({ security: [{ BearerToken: [] }] })
export class AuthorController {
  constructor(
    @Logger(module) private readonly logger: winston.Logger,
    private readonly authorService: AuthorService,
  ) {}

  @Post('/')
  @HttpCode(201)
  async create(@Body() body: AuthorCreateReq) {
    this.logger.info('request :: AuthorCreateReq :', body);
    return this.authorService.create(body);
  }

  @Get('/:id')
  @ResponseSchema(Author)
  public async getById(@Params() params: IdPathParams) {
    const author = await this.authorService.getById(params.id);
    this.logger.info(`author by id ${params.id}: `, author);
    return author;
  }

  @Patch('/:id')
  @ResponseSchema(Author)
  public async update(@Params() params: IdPathParams, @Body() body: AuthorUpdateReq) {
    this.logger.info(`update author by id: ${params.id} with req: `, body);
    const author = await this.authorService.partialUpdate(params.id, body);
    this.logger.info(`updated author by id ${params.id}: `, author);
    return author;
  }

  @Delete('/:id')
  @HttpCode(204)
  @OnUndefined(204)
  public async delete(@Params() params: IdPathParams) {
    await this.authorService.delete(params.id);
    return;
  }
}
