import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}

  async getStockData(symbol: string): Promise<any> {
    const url = `http://localhost:8000/api/stock_data/${symbol}`;
    const response = this.httpService
      .get<any>(url)
      .pipe(map((response: AxiosResponse<any>) => response.data));
    return lastValueFrom(response);
  }
}
