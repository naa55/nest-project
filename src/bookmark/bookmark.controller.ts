import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';
import { JwtGuard } from 'src/auth/guard';
import { PrismaService } from 'src/auth/prisma/prisma.service';
import { GetUser } from 'src/authenticate/decorator';

@Controller('bookmark')
export class BookmarkController {
    constructor(private prisma: PrismaService) {}
    // @Get()
    // @UseGuards(JwtGuard)
    // getBookmarks(@Res() response: Response, @GetUser() user: User) {
    //     console.log(user)
    //     // return response.json({ message: "This is bookmark" })
    //     // return this.prisma.bookmark.findMany({})
    // }
}
