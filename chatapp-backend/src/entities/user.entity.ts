import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ConnectedUserEntity } from './connected-user.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @Column()
  privateKey: string;

  @Column()
  photo: string;

  @OneToMany(() => ConnectedUserEntity, connection => connection.user)
  connections: ConnectedUserEntity[];
}
