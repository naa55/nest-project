import { Injectable } from '@nestjs/common';
import { PostDto, UpdatePostDto } from './dto';
import { PrismaService } from 'src/auth/prisma/prisma.service';
import { Response } from 'express';

@Injectable()
export class PostService {
    constructor(private prisma: PrismaService) { }

    async getAllPost() {
        return await this.prisma.post.findMany({
            include: {
                user: {
                    select: {
                        id: true,
                        createdAt: true,
                        firstName: true
                    }
                },
                tag: true
            },
        })
    }

    async createPost(dto: PostDto, response: Response) {
        const post = await this.prisma.post.create({
            data: {
                title: dto.title,
                description: dto.description,
                user: {
                    connect: { id: dto.userId }, // Use connect to associate the post with a user
                },
                tag: {
                    connectOrCreate: dto.tag.map(name => ({
                        create: { name },
                        where: { name },
                    })),
                },
                updatedAt: new Date(),
            },
        });

        return response.json({ message: 'Post created Successfully', post });
    }

    async updatePost(id: number, dto: UpdatePostDto, response: Response) {
        // get existing tags
        const getExitingTag =  await this.prisma.post.findUnique({
            where: {id},
            include: { tag: true }, // Include the tags associated with the post
        })
        // update post
        const updatePost = await this.prisma.post.update({
            where: { id },
            data: {
                title: dto.title,
                description: dto.description,
                tag: {
                    disconnect: getExitingTag.tag.map(tag => ({ id: tag.id })),
                    connectOrCreate: dto.tag.map(name => ({
                        create: { name },
                        where: { name },
                    })),
                },
            }

        })
        return response.json({ message: 'Updated Successfully', updatePost });
    }

    async deletePost(id: number) {
        return this.prisma.post.delete({
            where: { id }
        })
    }
}
