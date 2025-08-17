import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
} from "@nestjs/common";
import { PaymeBasicAuthGuard } from "src/auth/guards/payme.guard";
import { PaymeuzService } from "src/paymeuz/paymeuz.service";
import { RequestBody } from "../paymeuz/types/incoming-request-body";
import { RequestBody as PaynetReqbody } from "../paynet/types/incoming-request-body";

import {
  ClickGetInfoReqdto,
  ClickRequestDto,
} from "src/clickup/dto/click-request.dto";
import { ClickupService } from "src/clickup/clickup.service";
import { PaymentService } from "./payment.service";
import { GetPaymentLinkDto } from "./dto/payment.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { ApiBearerAuth } from "@nestjs/swagger";
import { Request } from "express";
import { ClickUzGetInfoBasicAuth } from "src/auth/guards/clickuz_getinfo.guard";
import { AtmosService } from "src/atmos/atmos.service";
import { AtmosGuard } from "src/auth/guards/atmos.guard";
import { PaynetService } from "src/paynet/paynet.service";
import { PaynetGuard } from "src/auth/guards/paynet.guard";
@ApiBearerAuth()
@Controller("ppayment")
export class PaymentController {
  constructor(
    private readonly paymeService: PaymeuzService,
    private readonly clickupService: ClickupService,
    private readonly paymentService: PaymentService,
    private readonly atmosService: AtmosService,
    private readonly paynetService: PaynetService
  ) {}

  @Post("paymeuz")
  @UseGuards(PaymeBasicAuthGuard)
  @HttpCode(HttpStatus.OK)
  async handleTransactionMethods(@Body() reqBody: RequestBody) {
    return await this.paymeService.handleTransactionMethods(reqBody);
  }

  // @Post('octo_push_notification')
  // async handleOctoPushNotification(@Body() reqBody) {
  //   console.log(reqBody);
  // }

  @Post("clickup")
  @HttpCode(HttpStatus.OK)
  // async handleClickShow(@Body() reqBody: ClickRequestDto) {
  async handleClickShow(@Req() req: Request) {
    let res = await this.clickupService.handleMerchantTransactions(req.body);
    console.log("Response", res);
    return res;
  }

  @Post("clickup/getinfo")
  @HttpCode(200)
  @UseGuards(ClickUzGetInfoBasicAuth)
  async getInfo(@Body() body: ClickGetInfoReqdto) {
    // console.log(body);
    return this.clickupService.get_info(body);
  }
  @Post("payment_link")
  @UseGuards(AuthGuard)
  async getPaymentLink(
    @Body() paymentService: GetPaymentLinkDto,
    @Req() req: Request
  ) {
    return this.paymentService.getPaymentLink(paymentService, req);
  }

  // @Post('atmos')
  // async handleAtmos(@Req() req: Request) {
  //   return this.atmosService.handleAtmos(req.body);
  // }

  @Post("atmos-webhook")
  @UseGuards(AtmosGuard)
  async atmosWebhook(@Req() req: Request) {
    let res = await this.atmosService.webhook(req.body);
    console.log(res);
    return res;
  }

  @Post("paynet")
  @HttpCode(HttpStatus.OK)
  @UseGuards(PaynetGuard)
  async paynet_handler(@Req() req: Request) {
    let res = await this.paynetService.handleTransactionMethods(
      req.body as PaynetReqbody
    );
    return res;
  }
}
