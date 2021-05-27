import { BadRequestException, Body, Controller, Get, Headers, HttpException, Param, Patch, Post, Query, UnauthorizedException } from '@nestjs/common';
import { AppService } from './app.service';
import { UserEntity } from './entities/user.entity';;
import { sha256 } from 'crypto-hash'
import { getRepository, ILike } from 'typeorm';
import { UserSessionEntity } from './entities/user-session.entity';

import * as crypto from 'crypto';
import { ProductEntity } from './entities/product.entity';
import { OrderEntity } from './entities/order.entity';

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

  @Get("/products/search")
  async search(@Query("input") input: string, @Query("sortField") sortField: string, @Query("sortOrder") sortOrder: string) {
    const products = await getRepository(ProductEntity).find({
      where: {
        isActive: true,
        name: ILike(`%${input}%`)
      },
      relations: ['owner'],
      order: {
        [sortField]: sortOrder.toUpperCase()
      }
    });

    return products;
  }

  @Get("/products/:id")
  async product(@Param("id") id: number) {
    const product = await getRepository(ProductEntity).findOne(id);

    return product;
  }

  @Patch("/products/:id")
  async editProduce(@Param("id") id: number, @Body("price") price?: string, @Body("name") name?: string, @Body("isActive") isActive?: boolean) {
    const product = await getRepository(ProductEntity).findOne(id);

    if(price) {
      product.price = parseFloat(price); 
      }
      if(name !== undefined) {
        product.name = name; 
        }
        if(isActive !== undefined) {
          product.isActive = isActive; 
          }

    await getRepository(ProductEntity).save(product);

    return product;
  }

  @Post("/products/:id/buy")
  async buyProduct(@Param("id") id: number, @Headers("authorization") authorization: string, @Body("deliveryAddress") deliveryAddress: string, @Body("message") message: string) {
    const user = await this.appService.getUserByAccessKey(authorization);

    const product = await getRepository(ProductEntity).findOne(id);


    const order = new OrderEntity();

    order.product = product;
    order.user = user;
    order.message = message;
    order.deliveryAddress = deliveryAddress;
    order.product = product;
    order.date = new Date();

    await getRepository(OrderEntity).save(order);

    return order;
  }

  @Get("/my-products")
  async myPooduct(@Headers("authorization") authorization: string, @Query("sortField") sortField?: string, @Query("sortOrder") sortOrder?: string) {
    const user = await this.appService.getUserByAccessKey(authorization);
    const products = await getRepository(ProductEntity).find({
      order: {
        [sortField]: sortOrder
      }
    });

    return products;
  }

  @Get("/my-orders")
  async myOrders(@Headers("authorization") authorization: string) {
    const user = await this.appService.getUserByAccessKey(authorization);

    const orders = await getRepository(OrderEntity).find({
      where: {
        user: {
          id: user.id
        }
      },
      relations: ['product'],
     order: {
       date: 'DESC'
     }
    });


    return orders;
  }

  @Get("/my-sells")
  async mySells(@Headers("authorization") authorization: string) {
    const user = await this.appService.getUserByAccessKey(authorization);

    const orders = await getRepository(OrderEntity).createQueryBuilder("order").leftJoinAndSelect("order.product", 'product').leftJoinAndSelect("product.owner", "owner").where("owner.id = :ownerId", { ownerId: user.id }).orderBy({ date: 'ASC' }).getMany();
    


    return orders;
  }
}
