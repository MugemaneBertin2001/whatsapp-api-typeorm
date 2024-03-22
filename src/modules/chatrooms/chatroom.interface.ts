
export interface ChatRoom {
    readonly _id?: string;
    readonly name: string;
    readonly participants: string[];
    readonly createdAt?: Date;
    readonly updatedAt?: Date;
  }