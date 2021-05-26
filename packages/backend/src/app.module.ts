import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSessionEntity } from './entities/user-session.entity';
import { UserEntity } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([UserSessionEntity, UserEntity])],
  controllers: [AppController],
  providers: [AppService],
}) 
export class AppModule {}
