import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { PaymentProvider } from '@prisma/client';
// enum PaymentSystem {
//   PAYME = 'PAYME',
//   CLICKUZ = 'CLICKUZ',
//   OCTO = 'OCTO',
// }
export class GetPaymentLinkDto {
  @ApiProperty({
    type: 'string',
    enum: ['PAYME', 'CLICKUZ', 'OCTO_UZ', 'ATMOSUZ', 'PAYNETUZ'],
  })
  @IsNotEmpty()
  @IsString()
  @IsEnum(PaymentProvider)
  payment_system: PaymentProvider;

  @ApiProperty({
    type: 'number',
    default: 40000,
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
