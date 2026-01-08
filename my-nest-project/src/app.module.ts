import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsControllerController } from './cats-controller/cats-controller.controller';
import { CatsServiceService } from './cats-service/cats-service.service';
import { CatModule } from './catModule/cat.module';
import { BookModule } from './book.module';
import { ConfigModule } from '@nestjs/config';
import { AuthorModule } from './author.module';
import { UserModule } from './user.module';
import { AuthModule } from './infrastructure/auth/auth.module';
import { UsersModule } from './presentation/controller/keycloak/users.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // VERY IMPORTANT
    }),
    CatModule,BookModule,AuthorModule,UserModule,AuthModule,UsersModule],
  
})
export class AppModule {}
