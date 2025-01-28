import { Test, TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { DatabaseModule } from '../database/database.module';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService],
      imports: [DatabaseModule],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
