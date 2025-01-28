import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateTicketDto {
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  eventId: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  userId?: string;

  @IsNumber()
  @IsOptional()
  quantity: number;
}
