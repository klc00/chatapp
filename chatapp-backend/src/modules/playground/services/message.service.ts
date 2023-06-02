import { Inject, Injectable } from '@nestjs/common';
import { MessageRepositoryInterface } from 'src/database/interfaces/message.repository.interface';
import { MessageEntity } from 'src/entities/message.entity';
import { UserEntity } from 'src/entities/user.entity';
import { Services } from 'src/utilities/constants';
import { MessageServiceInterface } from '../interfaces/message.service.interface';

@Injectable()
export class MessageService implements MessageServiceInterface {
    constructor(
        @Inject(Services.MessageRepositoryInterface)
        private readonly messageRepository: MessageRepositoryInterface,
    ) { }

    async getMessages(creatorId: number): Promise<MessageEntity[]> {
        return await this.messageRepository.getMessages(creatorId);
    }

    async getMessage(creatorId: number, recipientId: number): Promise<MessageEntity[]> {
        const t1 = await this.messageRepository.getMessage(creatorId, recipientId);
        const t2 = await this.messageRepository.getMessage(recipientId, creatorId);
        const messages: MessageEntity[] = [...t1, ...t2];
        return messages.sort((a, b) => a.id - b.id);
    }

    async createMessage(creator: UserEntity, recipient: UserEntity, text: string): Promise<MessageEntity> {
        const savedMessage = await this.messageRepository.save({
            creatorId: creator.id,
            recipientId: recipient.id,
            text,
        });
        return savedMessage;
    }
}
