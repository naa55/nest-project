import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagDto } from './dto/tag.dto';
import { JwtGuard } from 'src/auth/guard';

@Controller('tag')
export class TagController {
    constructor(private tagService: TagService) {}
    @Post()
    @UseGuards(JwtGuard)
    createTag(@Body() dto: TagDto) {
        return this.tagService.createTag(dto);
    }
}
