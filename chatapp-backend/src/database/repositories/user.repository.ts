import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../entities/user.entity';
import { UserRepositoryInterface } from '../interfaces/user.repository.interface';
import { BaseRepository } from './base/base.repository';

@Injectable()
export class UserRepository
  extends BaseRepository<UserEntity>
  implements UserRepositoryInterface {
  constructor(
    @InjectRepository(UserEntity)
    private readonly UserRepository: Repository<UserEntity>,
  ) {
    super(UserRepository);
  }
}
