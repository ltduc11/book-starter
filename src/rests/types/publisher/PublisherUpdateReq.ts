import { IsEmail, IsOptional, IsString } from 'class-validator';

export class PublisherUpdateReq {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  ownerName: string;

  @IsString()
  @IsOptional()
  phoneNumber: string;
}
