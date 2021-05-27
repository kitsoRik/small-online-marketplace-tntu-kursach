import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductEntity } from "./product.entity";
import { UserEntity } from "./user.entity";

@Entity({ name: 'orders' })
export class OrderEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ name: 'delivery_address' })
    deliveryAddress: string;
    
    @Column({ name: 'message' })
    message: string;
    
    @Column({ type: 'timestamp without time zone' })
    date: Date;

    @ManyToMany(() => UserEntity)
    user: UserEntity;

    @ManyToMany(() => ProductEntity)
    product: ProductEntity;

}