// backend/src/auth/auth.controller.ts

import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';

import { CreateUserAuthDto } from '../common/dto/create-user-auth.dto';
import { CreateUserDbDto } from '../common/dto/create-user-db.dto';
import { LoginDto } from '../common/dto/login.dto';
import { AuthService } from './auth.service';

@Controller('')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/register')
  async register(@Body() createUserAuthDto: CreateUserAuthDto) {
    try {
      const { email, password, userID, userName } = createUserAuthDto;

      // Firebase Authenticationで新規ユーザーを作成し、UIDを取得する
      const userRecord = await this.authService.createFirebaseUser(
        email,
        password,
      );

      // データベースに保存するためのユーザーデータを作成
      const createUserDbDto: CreateUserDbDto = {
        userID,
        userName,
        email,
        password, // パスワードをそのまま保存しないようにする
        role: 1, // デフォルトの役割を設定する
        uid: userRecord.uid, // FirebaseのUIDを設定
      };

      // データベースにユーザー情報を保存
      const user = await this.authService.register(createUserDbDto);

      return user;
    } catch (error) {
      console.error('Error in register:', error);
      throw new InternalServerErrorException('Internal Server Error');
    }
  }

  @Post('auth/login')
  async login(@Body() loginDto: LoginDto) {
    const { userID, password } = loginDto;

    const user = await this.authService.validateUser(userID, password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }
}
