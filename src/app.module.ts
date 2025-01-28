import { Module } from '@nestjs/common';
import { EventModule } from './event/event.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: true,
      envFilePath: '.env',
      isGlobal: true,
    }),
    EventModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
