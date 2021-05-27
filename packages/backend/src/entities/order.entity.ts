import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'fk_user_id' })
    user: UserEntity;

    @ManyToOne(() => ProductEntity)
    @JoinColumn({ name: 'fk_product_id' })
    product: ProductEntity;

}