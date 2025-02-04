import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    dateTime: string;

    @Column("decimal")
    sum: number;

    @Column()
    category: string;

    @Column()
    comment: string;

    @Column()
    author: string;
}
