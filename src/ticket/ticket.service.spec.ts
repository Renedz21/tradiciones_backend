import { Test, TestingModule } from '@nestjs/testing';
import { TicketService } from './ticket.service';
import { DatabaseModule } from '../database/database.module';
import { ConfigModule } from '@nestjs/config';

describe('TicketService', () => {
  let service: TicketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, ConfigModule],
      providers: [TicketService],
    }).compile();

    service = module.get<TicketService>(TicketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
