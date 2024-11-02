import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PicturesRepository {
  constructor(private readonly prisma: PrismaService) {}
}
