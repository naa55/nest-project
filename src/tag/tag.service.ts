import { Injectable } from '@nestjs/common';
import { TagDto } from './dto/tag.dto';
import { PrismaService } from 'src/auth/prisma/prisma.service';

@Injectable()
export class TagService {
    constructor(private prisma: PrismaService) { }
    createTag(dto: TagDto) {
        return this.prisma.tag.create({
            data: {
                name: dto.name
            }
        })
    }
}
