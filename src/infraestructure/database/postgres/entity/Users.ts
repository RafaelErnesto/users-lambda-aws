import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Users {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    role: string;

    @Column()
    age: number;

}