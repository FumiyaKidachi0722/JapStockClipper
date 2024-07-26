// backend/src/firebase/firebase.service.ts

import { Injectable } from '@nestjs/common';
import {
  initializeApp,
  applicationDefault,
  getApps,
  getApp,
} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

@Injectable()
export class FirebaseService {
  private db: ReturnType<typeof getFirestore>;

  constructor() {
    if (!getApps().length) {
      // Firebaseアプリが初期化されていない場合にのみ初期化する
      const app = initializeApp({
        credential: applicationDefault(),
        databaseURL: process.env.DATA_BASE_URL,
      });
      this.db = getFirestore(app);
    } else {
      // すでに初期化されている場合はデフォルトのアプリを使用する
      this.db = getFirestore(getApp());
    }
  }

  getDb() {
    return this.db;
  }
}
