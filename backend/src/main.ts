// backend/src/main.ts

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as admin from 'firebase-admin';
import * as fs from 'fs';

dotenv.config();

async function bootstrap() {
  const serviceAccountPath = process.env.SERVICE_ACCOUNT_KEY_PATH;
  if (!serviceAccountPath) {
    throw new Error('SERVICE_ACCOUNT_KEY_PATH is not defined');
  }

  const serviceAccount = JSON.parse(
    fs.readFileSync(serviceAccountPath, 'utf-8'),
  );

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  const app = await NestFactory.create(AppModule);

  // 環境変数の確認
  const frontendUrl = process.env.FRONTEND_URL;
  if (!frontendUrl) {
    throw new Error('FRONTEND_URL is not defined');
  }

  // CORSを有効にする
  app.enableCors({
    origin: frontendUrl, // フロントエンドのオリジンを指定
    credentials: true,
  });

  // グローバルプレフィックスを設定
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 4000;
  await app.listen(port);
}

bootstrap();
