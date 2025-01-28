import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

// import QRCode from 'qrcode';
import { ConfigService } from '@nestjs/config';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Injectable()
export class TicketService {
  logger: Logger = new Logger(TicketService.name);

  /**
   * Constructor de la clase TicketService
   * @param prisma - Servicio de base de datos Prisma
   * @param configService - Servicio de configuración
   * @returns - No devuelve nada
   *
   */
  constructor(
    private readonly prisma: DatabaseService,
    private readonly configService: ConfigService,
  ) {}

  async validate(qrToken: string) {
    const ticket = await this.prisma.ticket.findUnique({
      where: { qrCodeData: qrToken },
      include: { event: true },
    });

    if (!ticket || ticket.status !== 'ACTIVE') {
      throw new NotFoundException('Ticket inválido o ya usado');
    }

    // Marcar el ticket como usado (o mantenerlo activo para múltiples entradas)
    await this.prisma.ticket.update({
      where: { id: ticket.id },
      data: { isVerified: true, status: 'USED' },
    });

    return ticket;
  }

  async generateTicket(createTicketDto: CreateTicketDto) {
    const { eventId, userId, quantity } = createTicketDto;

    // Iniciar una transacción para evitar inconsistencias
    return this.prisma.$transaction(async (prisma) => {
      const event = await prisma.event.findUnique({
        where: { id: eventId },
        select: {
          id: true,
          title: true,
          availableTickets: true,
        },
      });

      if (!event) {
        throw new NotFoundException('Evento no encontrado');
      }

      // Validar disponibilidad
      if (event.availableTickets <= 0) {
        throw new Error('No hay tickets disponibles para este evento');
      }

      const ticketData = Array.from({ length: quantity }).map(() => ({
        eventId,
        userId,
        qrCodeData: crypto.randomUUID(),
      }));

      // Crear el ticket en la base de datos
      const ticket = await prisma.ticket.createMany({
        data: ticketData,
      });

      // Actualizar la disponibilidad del evento
      await prisma.event.update({
        where: { id: eventId },
        data: {
          availableTickets: event.availableTickets - quantity,
        },
      });

      // Construir la URL completa para el QR (ej: https://api.com/validate/a1b2c3d4)
      // Retornar los datos relevantes al cliente
      const qrCodeUrls = ticketData.map((ticket) => ({
        qrCodeUrl: `${this.configService.get('API_URL')}/ticket/validate/${ticket.qrCodeData}`,
      }));

      // Devolver datos relevantes al cliente (incluyendo la URL del QR)
      return {
        ticket,
        qrCodeUrls,
        eventTitle: event.title,
      };
    });
  }
}
