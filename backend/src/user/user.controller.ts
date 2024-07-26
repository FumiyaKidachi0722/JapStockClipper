// backend/src/user/user.controller.ts

import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDbDto } from '../common/dto/create-user-db.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../common/interfaces/user.interface';

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
