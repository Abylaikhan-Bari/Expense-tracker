import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {Transaction} from "./entities/transaction.entity";

@Injectable()
export class TransactionsService {
    constructor(
        @InjectRepository(Transaction)
        private transactionsRepository: Repository<Transaction>,
    ) {}

    async findAll(): Promise<Transaction[]> {
        return this.transactionsRepository.find();
    }

    async create(transaction: Transaction): Promise<Transaction> {
        return this.transactionsRepository.save(transaction);
    }

    async update(id: number, updatedTransaction: Partial<Transaction>): Promise<Transaction | null> {
        await this.transactionsRepository.update(id, updatedTransaction);
        return await this.transactionsRepository.findOne({ where: { id } }) || null;
    }

    async remove(id: number): Promise<void> {
        await this.transactionsRepository.delete(id);
    }
}
