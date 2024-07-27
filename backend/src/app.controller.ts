import { Controller, Get, Param } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('stock_data/:symbol')
  async getStockData(@Param('symbol') symbol: string): Promise<any> {
    console.log('symbol: ', symbol);
    return this.appService.getStockData(symbol);
  }
}
