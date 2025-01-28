import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Post('create')
  createTicket(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.generateTicket(createTicketDto);
  }

  @Get('validate/:qrToken')
  async validateTicket(@Param('qrToken') qrToken: string) {
    const ticket = await this.ticketService.validate(qrToken);
    return {
      isValid: true,
      ticket,
    };
  }
}
