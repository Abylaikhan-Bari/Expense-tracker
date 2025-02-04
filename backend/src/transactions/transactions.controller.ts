import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from './entities/transaction.entity';

@Controller('transactions')
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @Get()
    async findAll(): Promise<Transaction[]> {
        return this.transactionsService.findAll();
    }

    @Post()
    async create(@Body() transaction: Transaction): Promise<Transaction> {
        return this.transactionsService.create(transaction);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() updatedTransaction: Partial<Transaction>): Promise<Transaction | null> {
        const updated = await this.transactionsService.update(id, updatedTransaction);

        if (!updated) {
            throw new NotFoundException(`Transaction with ID ${id} not found.`);
        }

        return updated;
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.transactionsService.remove(id);
    }
}
