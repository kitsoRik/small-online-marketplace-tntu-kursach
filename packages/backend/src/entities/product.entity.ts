import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({ name: 'products' })
export class ProductEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ name: 'is_active' })
    isActive: boolean;

    @Column({ name: 'name' })
    name: string;
    
    @Column({ name: 'description' })
    description: string;
    
    @Column({ name: 'price' })
    price: number;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'fk_user_id' })
    owner: UserEntity;
}