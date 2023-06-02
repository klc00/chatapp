import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConnectedUserEntity } from '../../entities/connected-user.entity';
import { ConnectedUserRepositoryInterface } from '../interfaces/connected-user.repository.interface';

import { BaseRepository } from './base/base.repository';

@Injectable()
export class ConnectedUserRepository
  extends BaseRepository<ConnectedUserEntity>
  implements ConnectedUserRepositoryInterface {
  constructor(
    @InjectRepository(ConnectedUserEntity)
    private readonly ConnectedUserRepository: Repository<ConnectedUserEntity>,
  ) {
    super(ConnectedUserRepository);
  }
  async deleteAll(): Promise<void> {
    this.ConnectedUserRepository
      .createQueryBuilder()
      .delete()
      .execute();
  }
}
