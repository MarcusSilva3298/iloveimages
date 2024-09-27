import { Controller, Get, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { GetPictureUsecase } from '../../App/UseCases/GetPictureUseCase';
import { ListPicturesUseCase } from '../../App/UseCases/ListPicturesUseCase';
import { PictureQueryDto } from '../../Domain/Shared/Dtos/PictureQueryDto';

@Controller('/')
export class HttpController {
  constructor(
    private readonly getPictureUseCase: GetPictureUsecase,
    private readonly listPicturesUseCase: ListPicturesUseCase,
  ) {}

  @Get()
  ping(): string {
    return 'Serviço Online!';
  }

  @Get('/pictures/:key')
  async getPicture(
    @Param('key') key: string,
    @Query() query: PictureQueryDto,
    @Res() response: Response,
  ): Promise<void> {
    const picture = await this.getPictureUseCase.execute(key, query);

    response.set('Content-Type', `image/${picture.getFormat()}`);
    response.attachment(`${picture.getFilename()}.${picture.getFormat()}`);

    response.send(picture.getBuffer());
  }

  @Get('/pictures')
  async listPictures(): Promise<string[]> {
    return await this.listPicturesUseCase.execute();
  }
}
