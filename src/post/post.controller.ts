import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Res, UseGuards } from '@nestjs/common';
import { PostDto, UpdatePostDto } from './dto';
import { JwtGuard } from 'src/auth/guard';
import { PrismaService } from 'src/auth/prisma/prisma.service';
import { Response } from 'express';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private prisma: PrismaService, private post: PostService) { }
    @Get()
    @UseGuards(JwtGuard)
    async getAllPost() {
        // get all posts together with thier user
        return this.post.getAllPost()
    }

    @Post()
    @UseGuards(JwtGuard)
    async createPost(@Body() dto: PostDto, @Res() response: Response) {
        // console.log(dto);
        return this.post.createPost(dto, response);
    }

    @Patch(':id') 
    updatePost(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdatePostDto, @Res() response: Response) {
        return this.post.updatePost(id, dto, response);
    }

    @Delete(':id')
    deletePost(@Param('id', ParseIntPipe) id: number) {
        return this.post.deletePost(id);
    }
}
