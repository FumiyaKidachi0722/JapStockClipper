// backend/src/app.controller.ts

import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('config')
  getConfig() {
    return {
      frontendUrl: process.env.FRONTEND_URL,
    };
  }
}
