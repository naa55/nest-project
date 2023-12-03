import { Controller, Get, Req, UseGuards } from '@nestjs/common';
// import { User } from '@prisma/client';
import {Request} from 'express'
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/authenticate/decorator';

@UseGuards(JwtGuard)
@Controller('user')
export class UserController {
    // @Get('me') 
    // getMe(@GetUser() user:User) {
    //     // return user
    //     console.log(user);
      
    // }
}
