import { IsInt, IsString } from 'class-validator';
import { Field, Int, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'publisher',
})

@ObjectType()
export class Publisher {
  @PrimaryGeneratedColumn()
  @Field(of => Int)
  @IsInt()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  address: string;

  @Column()
  @IsString()
  email: string; //FIXME how to validate an email?

  @Column()
  @IsString()
  ownerName: string;

  @Column()
  @IsString()
  phoneNumber: string; //FIXME how to validate a phone number?
}
