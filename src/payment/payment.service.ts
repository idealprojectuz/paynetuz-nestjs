import { Injectable, NotFoundException } from '@nestjs/common';
import { GetPaymentLinkDto } from './dto/payment.dto';
import { Request } from 'express';
import { bot } from 'src/config/grammy';
import { AtmosService } from 'src/atmos/atmos.service';

@Injectable()
export class PaymentService {
  constructor(private readonly atmosService: AtmosService) {}
  async getPaymentLink(payment: GetPaymentLinkDto, req: Request) {
    // Simulate a payment link generation
    try {
      switch (payment.payment_system) {
        case 'PAYME':
          const data = `m=${process.env.PAYME_MERCHANT_ID};l=uz;ac.user_id=${req.user.id};a=${Number(payment.amount) * 100};c=https://t.me/${bot.botInfo.username}`;
          const encoded = Buffer.from(data).toString('base64');
          // return `https://payme.com/pay?amount=${payment.amount}`;
          return `https://checkout.paycom.uz/${encoded}`;
        case 'CLICKUZ':
          return `https://my.click.uz/services/pay?service_id=${process.env.CLICK_SERVICE_ID}&merchant_id=${process.env.CLICK_MERCHANT_ID}&amount=${payment.amount}&transaction_param=${req.user.id}&return_url=${`https://t.me/${bot.botInfo.username}`}`;
        case 'ATMOSUZ':
          return await this.atmosService.createInvoice({
            amount: payment.amount,
            client_id: req.user.id,
          });
        default:
          throw new Error(`To'lov usuli vaqtinchalik ishlamayabdi`);
      }
    } catch (error) {
      console.log(error);
      throw new NotFoundException(error.message);
    }

    // return `https://payment-gateway.com/pay?amount=${payment.amount}&currency=${payment.currency}`;
  }
}
