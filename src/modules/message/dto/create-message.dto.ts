import { Optional } from '@nestjs/common';
import {
  IsString,
  IsArray,
  ArrayNotEmpty,
  isString,
  IsNotEmpty,
} from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty()
  readonly content: string;

  @IsString()
  @IsNotEmpty()
  chatRoomId: string;

  @IsString()
  @IsNotEmpty()
  senderId: string;

  @IsString({ each: true })
  @IsArray()
  @Optional()
  readonly attachments: string[];
}
