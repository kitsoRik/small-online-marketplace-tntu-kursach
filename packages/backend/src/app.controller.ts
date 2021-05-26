import { BadRequestException, Body, Controller, Get, Headers, HttpException, Post, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import { UserEntity } from './entities/user.entity';;
import { sha256 } from 'crypto-hash'
import { getRepository } from 'typeorm';
import { UserSessionEntity } from './entities/user-session.entity';

import * as crypto from 'crypto';
import { ProductEntity } from './entities/product.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/register')
  async register(@Body() body: any): Promise<any> {
    const user = new UserEntity();

    user.firstName = body.firstName;
    user.lastName = body.lastName;

    user.email = body.email;
    user.passwordHash = await sha256(body.password);
 
    await getRepository(UserEntity).save(user);

    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    }
  }

  @Post('/login')
  async login(@Body() body: any): Promise<any> {
    const user = await getRepository(UserEntity).findOne({
      select: ['id', 'firstName', 'lastName', 'email', 'passwordHash'],
      where: {
        email: body.email
      }
    });

    if(!user) throw new BadRequestException();

    if(user.passwordHash !==await sha256(body.password)) {
      throw new UnauthorizedException();
    }

    const { id, firstName, lastName, email  } = user;

    const session = new UserSessionEntity();

    session.user = user;
    session.key = crypto.randomBytes(256).toString('base64').slice(0, 128);

    await getRepository(UserSessionEntity).save(session);

    return {
      id, firstName, lastName, email, accessKey: session.key
    };
  }

  @Post('/me')
  async me(@Headers("authorization") authorization: string): Promise<any> {
    
    const { id, firstName, lastName, email  } = await this.appService.getUserByAccessKey(authorization);

    return {
      id, firstName, lastName, email
    };
  }

  @Post("/add-product")
  async addProduct(@Headers("authorization") authorization: string, @Body() body: ProductEntity) {
    const product = new ProductEntity();

    product.isActive = body.isActive;
    product.name = body.name;
    product.description = body.description;
    product.price = body.price;
    product.owner = await this.appService.getUserByAccessKey(authorization);

    await getRepository(ProductEntity).save(product);

    return product;
  }
}
