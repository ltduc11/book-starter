import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class BookCreateReq {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  type: string;

  @IsString()
  @IsOptional()
  publishYear: string;

  // @IsNumber()
  // @IsOptional()
  // publisher: number; //id

  // @IsArray()
  // @IsOptional()
  // authors: number[]; //id array
}
