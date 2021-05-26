import { Injectable, UnauthorizedException } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { UserSessionEntity } from './entities/user-session.entity';

@Injectable()
export class AppService {
  async getUserByAccessKey(accessKey: string) {
    const session = await getRepository(UserSessionEntity).findOne({
      where: {
        key: accessKey
      },
      relations: ['user']
    });

    if(!session) throw new UnauthorizedException();

    return session.user;
  }
}
