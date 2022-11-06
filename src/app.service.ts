import { Injectable } from '@nestjs/common';

export type Message = {
  message: string;
};

@Injectable()
export class AppService {
  getHello(): Message {
    return {
      message: 'Hello World',
    };
  }
}
