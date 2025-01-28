import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class EventService {
  logger: Logger = new Logger('EventService'); // Create logger

  /**
   * @param prisma Inject PrismaClient from DatabaseService
   * @see DatabaseService
   */
  constructor(private readonly prisma: DatabaseService) {}

  /**
   * Create a new event in the database
   * @param createEventDto Event data
   * @returns Created event
   */
  async create(createEventDto: Prisma.EventCreateInput) {
    try {
      if (!createEventDto) {
        throw new BadRequestException(
          'No se proporcionaron datos para crear el evento',
        );
      }

      const event = await this.prisma.event.create({
        data: createEventDto,
      }); // Create event

      return event; // Return created
    } catch (error) {
      this.logger.error(error); // Log error
      throw new InternalServerErrorException(
        'Ocurrió un error al crear el evento',
      );
    }
  }

  async findAll() {
    try {
      const events = await this.prisma.event.findMany({
        select: {
          id: true,
          title: true,
          capacity: true,
          availableTickets: true,
        },
        orderBy: {
          createdAt: 'asc',
        },
      }); // Find all events

      return events; // Return events
    } catch (error) {
      this.logger.error(error); // Log error
      throw new InternalServerErrorException(
        'Ocurrió un error al obtener los eventos',
      );
    }
  }

  async findOne(id: string) {
    try {
      if (!id) {
        throw new BadRequestException('No se proporcionó el ID del evento');
      }

      const event = await this.prisma.event.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
          title: true,
          capacity: true,
          availableTickets: true,
        },
      }); // Find event

      if (!event) {
        throw new NotFoundException('El evento no existe');
      }

      return event; // Return event
    } catch (error) {
      this.logger.error(error); // Log error
      throw new InternalServerErrorException(
        'Ocurrió un error al obtener el evento',
      );
    }
  }

  async update(id: string, updateEventDto: Prisma.EventUpdateInput) {
    try {
      if (!id) {
        throw new BadRequestException('No se proporcionó el ID del evento');
      }

      await this.getEventById(id); // Get event by ID

      await this.prisma.event.update({
        where: {
          id: id,
        },
        data: updateEventDto,
      }); // Update event

      return {
        message: 'Evento actualizado correctamente',
      };
    } catch (error) {
      this.logger.error(error); // Log error
      throw new InternalServerErrorException(
        'Ocurrió un error al actualizar el evento',
      );
    }
  }

  remove(id: string) {
    return `This action removes a #${id} event`;
  }

  private async getEventById(id: string) {
    try {
      const event = await this.prisma.event.findUnique({
        where: {
          id: id,
        },
        select: {
          id: true,
        },
      }); // Find event

      if (!event) {
        throw new NotFoundException('El evento no existe');
      }

      return event; // Return event
    } catch (error) {
      this.logger.error(error); // Log error
      throw new InternalServerErrorException(
        'Ocurrió un error al obtener el evento',
      );
    }
  }
}
