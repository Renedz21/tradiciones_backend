import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class OrderService {
  logger: Logger = new Logger(OrderService.name);

  /**
   *
   */
  constructor(private readonly prisma: DatabaseService) {}
  create(createOrderDto: Prisma.OrderCreateInput) {
    return 'This action adds a new order';
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: string) {
    return `This action returns a #${id} order`;
  }

  update(id: string, updateOrderDto: Prisma.OrderUpdateInput) {
    return `This action updates a #${id} order`;
  }

  remove(id: string) {
    return `This action removes a #${id} order`;
  }
}
