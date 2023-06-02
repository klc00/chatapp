import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from '../../entities/message.entity';
import { MessageRepositoryInterface } from '../interfaces/message.repository.interface';

import { BaseRepository } from './base/base.repository';

@Injectable()
export class MessageRepository
  extends BaseRepository<MessageEntity>
  implements MessageRepositoryInterface {
  constructor(
    @InjectRepository(MessageEntity)
    private readonly MessageRepository: Repository<MessageEntity>,
  ) {
    super(MessageRepository);
  }
  public async getMessages(
    userId: number,
  ): Promise<MessageEntity[]> {
    return await this.MessageRepository
      .createQueryBuilder('message')
      .where('message.creatorId = :id', { id: userId })
      .orWhere('message.recipientId = :id', { id: userId })
      .orderBy('message.id', 'DESC')
      .getMany();
  }
  public async getMessage(
    creatorId: number,
    recipientId: number,
  ): Promise<MessageEntity[]> {
    return await this.MessageRepository
      .createQueryBuilder('message')
      .where('message.creatorId = :creatorId', { creatorId: creatorId })
      .andWhere('message.recipientId = :recipientId', { recipientId: recipientId })
      .orderBy('message.id', 'DESC')
      .getMany();
  }
}
