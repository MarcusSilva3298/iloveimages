import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class HttpController {
  constructor() {}

  @Get()
  ping(): string {
    return 'Serviço Online!';
  }
}
