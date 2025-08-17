import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { PaymeuzService } from 'src/paymeuz/paymeuz.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { BotService } from 'src/bot/bot.service';
import { ClickupService } from 'src/clickup/clickup.service';
import { HashingService } from 'src/utils/hashing/hashing.service';
import { BotModule } from 'src/bot/bot.module';
import { PaymentService } from './payment.service';
import { AtmosService } from 'src/atmos/atmos.service';
import { PaynetService } from 'src/paynet/paynet.service';

@Module({
  imports: [UsersModule],
  controllers: [PaymentController],
  providers: [
    PaymeuzService,
    UsersService,
    // BotService,
    AtmosService,
    ClickupService,
    HashingService,
    PaymentService,
    PaynetService,
  ],
})
export class PaymentModule {}
