import { Module } from '@nestjs/common';
import { EventModule } from './event/event.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { OrderModule } from './order/order.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      envFilePath: '.env',
      isGlobal: true,
    }),
    EventModule,
    DatabaseModule,
    UserModule,
    OrderModule,
    TicketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
