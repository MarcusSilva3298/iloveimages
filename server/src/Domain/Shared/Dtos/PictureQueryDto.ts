import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { PicturesFormatsEnum } from '../Enums/PicturesFormatsEnum';

export class PictureQueryDto {
  @Min(1)
  @Max(100)
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  q?: number;

  @IsEnum(PicturesFormatsEnum)
  @IsOptional()
  fm?: string;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  w?: number;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  h?: number;

  @IsEnum({ zero: '0', one: '1' })
  @IsOptional()
  gray?: string;
}
