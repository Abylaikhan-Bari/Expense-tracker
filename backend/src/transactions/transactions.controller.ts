import { Controller, Get, Post, Delete, Body, Param } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import {Transaction} from "./entities/transaction.entity";

@Controller("transactions")
export class TransactionsController {
    constructor(private readonly transactionsService: TransactionsService) {}

    @Get()
    async getAll(): Promise<Transaction[]> {
        return this.transactionsService.getAll();
    }

    @Post()
    async create(@Body() transaction: Transaction): Promise<Transaction> {
        return this.transactionsService.create(transaction);
    }

    @Delete(":id")
    async delete(@Param("id") id: number): Promise<void> {
        return this.transactionsService.delete(id);
    }
}
