import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity({ name: 'user_sessions' })
export class UserSessionEntity {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ length: 128 })
    key: string;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'fk_user_id' })
    user: UserEntity;
}