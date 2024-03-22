import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class AttachmentDto {
  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsString()
  type: string;
  
  @IsOptional()
  @IsNumber()
  size?: number;

  @IsNotEmpty()
  @IsString()
  messageId: string;
}