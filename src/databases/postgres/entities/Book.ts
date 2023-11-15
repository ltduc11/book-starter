import { IsInt, IsObject, IsString, ValidateNested } from 'class-validator';
import { Field, Int, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Type } from 'class-transformer';

import { Publisher } from '@Entities/Publisher';
import { Author } from '@Entities/Author';

@Entity({
  name: 'book',
})

@ObjectType()
export class Book {
  @PrimaryGeneratedColumn()
  @Field(of => Int)
  @IsInt()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  type: string; //FIXME this should be an entity

  @Column()
  @IsString()
  publishYear: string; //FIXME how to perform a year?

  // @ManyToOne(() => Publisher, (publisher) => publisher.id, {})
  // @ValidateNested()
  // @Type(() => Publisher)
  // publisher: Publisher;

  // @ManyToMany(() => Author, author => author.books, {})
  // @ValidateNested()
  // authors: Author[]
}
