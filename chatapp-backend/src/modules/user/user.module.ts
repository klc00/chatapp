import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/database/repositories/user.repository';
import { UserEntity } from 'src/entities/user.entity';
import { Services } from 'src/utilities/constants';
import { AuthModule } from '../auth/auth.module';
import { UserController } from './controllers/user.controller';
import { UserDtoService } from './services/user.dto.service';
import { UserService } from './services/user.service';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([
      UserEntity,
    ]),
  ],
  providers: [
    {
      provide: Services.UserServiceInterface,
      useClass: UserService,
    },
    {
      provide: Services.UserDtoServiceInterface,
      useClass: UserDtoService,
    },
    {
      provide: Services.UserRepositoryInterface,
      useClass: UserRepository,
    },
  ],
  exports: [
    {
      provide: Services.UserServiceInterface,
      useClass: UserService,
    },
  ],
  controllers: [UserController],
})
export class UserModule { }
