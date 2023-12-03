import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/auth/prisma/prisma.service';
import { SignInDto, SignUpDto } from './dto';
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService, 
    private jwt: JwtService,
    private config: ConfigService
    ) {}

  async signUp(dto: SignUpDto) {
  // return this.authService.signUp(dto);
    // generate the password hash
    console.log(dto)
    const hash = await argon.hash(dto.password)
    // save the new user in the db
    try {
        const user = await this.prisma.user.create({
            data: {
                email: dto.email,
                hash,
                firstName: dto.firstName,
                lastName: dto.lastName
            },
        })
        return this.signToken(user.id, user.email);

    } catch (error) {
        if(error instanceof PrismaClientKnownRequestError) {
            if(error.code === "P2002") {
                throw new ForbiddenException("Credential taken")
            }
        }
        throw error
    }
    
  }

  async signIn(dto: SignInDto) {
    // find user by email
    const user = await this.prisma.user.findFirst({
            where: {
                email: dto.email
            }
    })
    if(!user) {
        throw new ForbiddenException(
            'Credentials incorrect'
        )
    }
    // compare password
    const pwMatches = await argon.verify(
        user.hash,
        dto.password
    );
    if(!pwMatches)
        throw new ForbiddenException(
            'Credentials incorrect'
        )
    // if user does not exit throw exception
    // delete user.hash;
    return this.signToken(user.id, user.email);
    //send back the user
  }

   async signToken(userId: number, email: string): Promise<{ access_token: string }> {
    const user = await this.prisma.user.findUnique({
        where: {
            id: userId
        }
    })
    delete user.hash
        const payload = {
            sub: userId,
            email
        }
        const secret = this.config.get('JWT_SECRET');
        const token = await this.jwt.signAsync(payload, {
                expiresIn: '60m',
                secret: secret
        })
        return {
            access_token: token,
        }
  }
}
