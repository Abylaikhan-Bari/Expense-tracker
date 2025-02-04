import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {Transaction} from "./entities/transaction.entity";

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionsRepository: Repository<Transaction>,
    ) {}

    getAll(): Promise<Transaction[]> {
        return this.transactionsRepository.find();
    }

    create(transaction: Transaction): Promise<Transaction> {
        return this.transactionsRepository.save(transaction);
    }

    async delete(id: number): Promise<void> {
        await this.transactionsRepository.delete(id);
    }
}
