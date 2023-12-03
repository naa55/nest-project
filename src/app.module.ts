import { Module } from '@nestjs/common';
import { AuthModule } from './authenticate/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './auth/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { TagModule } from './tag/tag.module';
@Module({
  imports: [
     AuthModule, 
     UserModule, 
     BookmarkModule,
     PostModule,
     PrismaModule, 
     ConfigModule.forRoot({
      isGlobal: true
     }), TagModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
