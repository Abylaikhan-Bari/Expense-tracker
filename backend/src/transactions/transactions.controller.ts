import { Controller, Get, Post, Body } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from './entities/transaction.entity';

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @Post()
    create(@Body() data: Partial<Transaction>) {
        return this.transactionsService.create(data);
    }

    @Get()
    findAll() {
        return this.transactionsService.findAll();
    }
}
