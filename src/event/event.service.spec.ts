import { Test, TestingModule } from '@nestjs/testing';
import { EventService } from './event.service';
import { DatabaseModule } from '../database/database.module';

describe('EventService', () => {
  let service: EventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [EventService],
    }).compile();

    service = module.get<EventService>(EventService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of events', async () => {
      const result = [
        { id: '1', title: 'Event 1', capacity: 200, availableTickets: 200 },
      ];

      jest
        .spyOn(service, 'findAll')
        .mockImplementation(() => Promise.resolve(result));

      expect(await service.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a single event', async () => {
      const result = {
        id: '1',
        title: 'Event 1',
        capacity: 200,
        availableTickets: 200,
      };

      jest
        .spyOn(service, 'findOne')
        .mockImplementation(() => Promise.resolve(result));

      expect(await service.findOne('1')).toBe(result);
    });
  });
});
