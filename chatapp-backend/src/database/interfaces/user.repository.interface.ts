import { UserEntity } from '../../entities/user.entity';
import { RepositoryInterface } from '../repositories/base/repository.interface';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface UserRepositoryInterface
  extends RepositoryInterface<UserEntity> {}
