import { IsEmail, IsOptional, IsString } from 'class-validator';

export class PublisherCreateReq {
  @IsString()
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
