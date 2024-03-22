// update-message.dto.ts

import { IsOptional, IsString, isNotEmpty } from 'class-validator';

export class UpdateMessageDto {
  @IsString()    
  content: string; 

  
}
