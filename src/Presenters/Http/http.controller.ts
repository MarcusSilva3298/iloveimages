import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { GetPictureUsecase } from '../../App/UseCases/GetPictureUseCase';
import { IPictureQuery } from '../../Domain/Shared/Interfaces/IPictureQuery';

@Controller('/')
export class HttpController {
  constructor(private readonly getPictureUseCase: GetPictureUsecase) {}

  @Get()
  ping(): string {
    return 'Serviço Online!';
  }

  @Get('/pictures/:key')
  async getPicture(
    @Param('key') key: string,
    @Query() query: IPictureQuery,
    @Res() response: Response,
  ) {
    const fileStream = await this.getPictureUseCase.execute(key, query);

    response.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="dowload-teste.png"`,
    });

    response.attachment('dowload-teste.png');

    fileStream.pipe(response);
  }
}
