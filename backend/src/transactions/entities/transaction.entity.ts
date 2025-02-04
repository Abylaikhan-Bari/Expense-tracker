import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    dateTime: Date;

    @Column()
    author: string;

    @Column("decimal")
    sum: number;

    @Column()
    category: string;

    @Column({ nullable: true })
    comment: string;
}
