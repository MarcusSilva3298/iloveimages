import { IPictureQuery } from '../Interfaces/IPictureQuery';

export class PictureQueryDto {
  qualidade: number;
  formato?: string;
  width?: number;
  heigth?: number;
  grayscale: number;

  constructor(props: IPictureQuery) {
    this.qualidade = Number(props.q) || 85;
    this.formato = props.fm || undefined;
    this.width = Number(props.w) || undefined;
    this.heigth = Number(props.h) || undefined;
    this.grayscale = Number(props.gray) || 0;
  }
}
