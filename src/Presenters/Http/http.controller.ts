import { Controller, Get, Inject, Param, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { IUseCase } from '../../App/Ports/IUseCase';
import { Picture } from '../../Domain/Entities/Picture';
import { PictureQueryDto } from '../../Domain/Shared/Dtos/PictureQueryDto';
import { PicturesUseCasesEnum } from '../../Domain/Shared/Enums/PicturesUseCasesEnum';

@Controller('/')
export class HttpController {
  constructor(
    @Inject(PicturesUseCasesEnum.GET_PICTURE_USE_CASE)
    private readonly getPictureUseCase: IUseCase<
      Picture,
      [string, PictureQueryDto]
    >,

    @Inject(PicturesUseCasesEnum.LIST_PICTURES_USE_CASE)
    private readonly listPicturesUseCase: IUseCase<string[]>,
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
