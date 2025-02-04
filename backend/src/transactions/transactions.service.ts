import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
    constructor(@InjectRepository(Transaction) private repo: Repository<Transaction>) {}

    create(data: Partial<Transaction>) {
        const transaction = this.repo.create(data);
        return this.repo.save(transaction);
    }

    findAll() {
        return this.repo.find();
    }
}
