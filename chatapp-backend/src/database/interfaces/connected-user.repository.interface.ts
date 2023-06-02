import { ConnectedUserEntity } from '../../entities/connected-user.entity';
import { RepositoryInterface } from '../repositories/base/repository.interface';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConnectedUserRepositoryInterface
  extends RepositoryInterface<ConnectedUserEntity> {
  deleteAll(): Promise<void>;
}
