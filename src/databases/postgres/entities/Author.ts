import { IsDateString, IsEnum, IsInt, IsString, ValidateNested } from 'class-validator';
import { Field, Int, ObjectType } from 'type-graphql';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { AuthorGender } from '@Enums/AuthorGender';

import { Book } from '@Entities/Book';

@Entity({
  name: 'author',
})

@ObjectType()
export class Author {
  @PrimaryGeneratedColumn()
  @Field(of => Int)
  @IsInt()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column({ nullable: true })
  @IsEnum(AuthorGender)
  gender: AuthorGender;

  @Column({ nullable: true })
  @IsDateString()
  birthday: Date;

  // @ManyToMany(() => Book, book => book.authors, {})
  // @ValidateNested()
  // books: Book[];
}
