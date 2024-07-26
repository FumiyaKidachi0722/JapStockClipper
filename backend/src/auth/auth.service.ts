// backend/src/auth/auth.service.ts

import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { CreateUserDbDto } from '../common/dto/create-user-db.dto';
import { User } from '../common/interfaces/user.interface';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async createFirebaseUser(email: string, password: string) {
    return admin.auth().createUser({
      email,
      password,
    });
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async register(createUserDbDto: CreateUserDbDto): Promise<User> {
    const { email, password, userID, userName, role, uid } = createUserDbDto;
    const hashedPassword = await this.hashPassword(password);

    const newUser = await this.userService.createIfNotExists({
      userID,
      userName,
      email,
      password: hashedPassword,
      role,
      uid,
    });

    return newUser;
  }

  async validateUser(userID: string, password: string): Promise<User | null> {
    const user = await this.userService.findOne(userID);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { userID: user.userID, sub: user.uid };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
