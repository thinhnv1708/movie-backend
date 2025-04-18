import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor() {}

  async health() {
    return "I'm good!";
  }
}
