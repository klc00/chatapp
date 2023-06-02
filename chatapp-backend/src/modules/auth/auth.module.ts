import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/utilities/security/strategies/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Services } from 'src/utilities/constants';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXPIRATION') }
      })
    })
  ],
  providers: [
    {
      provide: Services.AuthServiceInterface,
      useClass: AuthService,
    },
    JwtStrategy,
  ],
  exports: [
    {
      provide: Services.AuthServiceInterface,
      useClass: AuthService,
    },
  ],
})
export class AuthModule { }