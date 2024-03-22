export class CreateChatRoomDto {
    readonly name: string;
    creator : string;
    readonly participants: string[]; 
  }