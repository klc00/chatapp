import { Module } from '@nestjs/common';
import { PlaygroundGateway } from './gateways/playground.gateway';
import { MessageRepository } from 'src/database/repositories/message.repository';
import { MessageService } from './services/message.service';
import { UserModule } from '../user/user.module';
import { Services } from 'src/utilities/constants';
import { ConnectedUserRepository } from 'src/database/repositories/connected-user.repository';
import { ConnectedUserService } from './services/connected-user.service';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity } from 'src/entities/message.entity';
import { ConnectedUserEntity } from 'src/entities/connected-user.entity';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TypeOrmModule.forFeature([
      MessageEntity,
      ConnectedUserEntity,
    ]),

  ],
  providers: [
    PlaygroundGateway,
    {
      provide: Services.ConnectedUserServiceInterface,
      useClass: ConnectedUserService,
    },
    {
      provide: Services.MessageServiceInterface,
      useClass: MessageService,
    },
    {
      provide: Services.MessageRepositoryInterface,
      useClass: MessageRepository,
    },
    {
      provide: Services.ConnectedUserRepositoryInterface,
      useClass: ConnectedUserRepository,
    },
  ]
})
export class PlaygroundModule { }
