
import { Body, Delete, Get, HttpCode, JsonController, OnUndefined, Params, Patch, Post } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { Service } from 'typedi';
import winston from 'winston';

import { Logger } from '@Decorators/Logger';

import { Book } from '@Entities/Book';

import { BookService } from '@Services/BookService';

import { BookCreateReq, BookUpdateReq } from '@Rests/types/book';
import { IdPathParams } from '@Rests/types/IdPathParams';

@Service()
@JsonController('/book')
@OpenAPI({ security: [{ BearerToken: [] }] })
export class BookController {
  constructor(
    @Logger(module) private readonly logger: winston.Logger,
    private readonly bookService: BookService,
  ) {}

  @Post('/')
  @HttpCode(201)
  async create(@Body() body: BookCreateReq) {
    this.logger.info('request :: BookCreateReq :', body);
    return this.bookService.create(body);
  }

  @Get('/:id')
  @ResponseSchema(Book)
  public async getById(@Params() params: IdPathParams) {
    const book = await this.bookService.getById(params.id);
    this.logger.info(`book by id ${params.id}: `, book);
    return book;
  }

  @Patch('/:id')
  @ResponseSchema(Book)
  public async update(@Params() params: IdPathParams, @Body() body: BookUpdateReq) {
    this.logger.info(`update book by id: ${params.id} with req: `, body);
    const book = await this.bookService.partialUpdate(params.id, body);
    this.logger.info(`updated book by id ${params.id}: `, book);
    return book;
  }

  @Delete('/:id')
  @HttpCode(204)
  @OnUndefined(204)
  public async delete(@Params() params: IdPathParams) {
    await this.bookService.delete(params.id);
    return;
  }
}
