import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ name: 'first_name' })
    firstName: string;
    
    @Column({ name: 'last_name' })
    lastName: string;
    
    @Column({ name: 'email', unique: true })
    email: string;
    
    @Column({ name: 'passwordHash', select: false })
    passwordHash: string;
}