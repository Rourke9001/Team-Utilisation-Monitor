import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AuthRepositoryService } from 'auth-repo/auth-repository';
import { PrismaServiceAuthentication } from 'shared/prisma-services-authentication.service';
import { CommandHandlers } from './commands/handlers';
import { ServicesService } from './services.service';

@Module({
  imports:[CqrsModule],
  providers: [
    ServicesService,
    ...CommandHandlers,
    AuthRepositoryService,
    PrismaServiceAuthentication],
  exports: [ServicesService],
})
export class ServicesModule {}
