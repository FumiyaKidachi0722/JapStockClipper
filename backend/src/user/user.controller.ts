// backend/src/user/user.controller.ts

import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateUserDbDto } from '../common/dto/create-user-db.dto';
import { User } from '../common/interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile/:id')
  async getProfile(@Param('id') id: string): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDbDto): Promise<User> {
    // Firestoreにユーザー情報を保存
    return this.userService.createIfNotExists(createUserDto);
  }
}
