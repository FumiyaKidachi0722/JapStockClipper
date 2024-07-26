// backend/src/user/user.service.ts

// backend/src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { CreateUserDbDto } from '../common/dto/create-user-db.dto';
import { User } from '../common/interfaces/user.interface';
import { UserNotFoundException } from '../common/exceptions/user-not-found.exception';
import {
  CollectionReference,
  QuerySnapshot,
  DocumentSnapshot,
} from '@google-cloud/firestore';

@Injectable()
export class UserService {
  private userCollection: CollectionReference;

  constructor(private readonly firebaseService: FirebaseService) {
    this.userCollection = this.firebaseService.getDb().collection('users');
  }

  async findOne(userId: string): Promise<User> {
    const userDoc: DocumentSnapshot = await this.userCollection
      .doc(userId)
      .get();
    if (!userDoc.exists) {
      throw new UserNotFoundException(userId);
    }
    return userDoc.data() as User;
  }

  async findOneByUid(uid: string): Promise<User> {
    const q = this.userCollection.where('uid', '==', uid);
    const querySnapshot: QuerySnapshot = await q.get();
    if (querySnapshot.empty) {
      throw new UserNotFoundException(uid);
    }
    return querySnapshot.docs[0].data() as User;
  }

  async createIfNotExists(createUserDto: CreateUserDbDto): Promise<User> {
    const { uid } = createUserDto;

    // UIDでユーザーを検索
    const existingUser = await this.findOneByUid(uid).catch(() => null);

    // ユーザーが存在しない場合、新規作成
    if (!existingUser) {
      await this.userCollection.doc(createUserDto.userID).set(createUserDto);
      return createUserDto;
    }

    // ユーザーが存在する場合、そのユーザーを返す
    return existingUser;
  }
}
