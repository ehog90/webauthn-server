import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { DbModule } from '../db/db.module';
import { LoginController } from './controllers/login/login.controller';
import { JwtGuard } from './guards/jwt/jwt.guard';
import { AuthService } from './services/auth/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [LoginController],
  imports: [
    DbModule,
    JwtModule.register({
      signOptions: { algorithm: 'HS512', expiresIn: '1h' },
      secret: process.env.JWT_SECRET ?? 'jwt_secret',
    }),
  ],
  providers: [AuthService, JwtGuard, JwtStrategy],
  exports: [JwtGuard],
})
export class AuthModule {}
