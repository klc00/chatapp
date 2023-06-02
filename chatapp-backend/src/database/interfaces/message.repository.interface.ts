import { MessageEntity } from '../../entities/message.entity';
import { RepositoryInterface } from '../repositories/base/repository.interface';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MessageRepositoryInterface
  extends RepositoryInterface<MessageEntity> {
  getMessages(
    userId: number
  ): Promise<MessageEntity[]>;
  getMessage(
    creatorId: number,
    recipientId: number,
  ): Promise<MessageEntity[]>;
}
