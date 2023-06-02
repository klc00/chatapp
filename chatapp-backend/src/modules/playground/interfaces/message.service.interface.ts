import { MessageEntity } from "src/entities/message.entity";
import { UserEntity } from "src/entities/user.entity";

export interface MessageServiceInterface {
    getMessages(creatorId: number): Promise<MessageEntity[]>;
    getMessage(creatorId: number, recipientId: number): Promise<MessageEntity[]>;
    createMessage(user: UserEntity, to: UserEntity, text: string): Promise<MessageEntity>;
}