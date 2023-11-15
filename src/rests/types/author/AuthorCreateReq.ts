import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';

import { AuthorGender } from '@Enums/AuthorGender';

export class AuthorCreateReq {
  @IsString()
  name: string;

  @IsOptional()
  @IsEnum(AuthorGender)
  gender: AuthorGender;

  @IsOptional()
  @IsDateString()
  birthday: Date;

  // TODO books: []
}
