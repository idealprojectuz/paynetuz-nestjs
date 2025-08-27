import { Injectable, Logger } from "@nestjs/common";
import { RequestBody } from "./types/incoming-request-body";
import { TransactionMethods } from "./constants/transaction-methods";
import { GetInformationDto } from "./dto/getinformation.dto";
import { CheckTransaction } from "./dto/checkTransaction.dto";
import { CancelTransactionDto } from "./dto/cancelTransaction.dto";
import { GetStatement } from "./dto/getStatement.dto";
import { PerformTransactionDto } from "./dto/performTransaction.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { PaynetStatusCode } from "./constants/error_status_codes";
import { PaynetError } from "./constants/paynet-error";
import { format } from "date-fns";
import { error } from "console";
import { TransactionState } from "./constants/transaction.state";

@Injectable()
export class PaynetService {
  constructor(private readonly prismaService: PrismaService) {}
  private readonly logger = new Logger(PaynetService.name);

  async handleTransactionMethods(reqBody: RequestBody) {
    const method = reqBody.method;
    switch (method) {
      case TransactionMethods.GetInformation:
        return await this.GetInformation(reqBody as GetInformationDto);

      case TransactionMethods.CheckTransaction:
        return await this.checkTransaction(reqBody as CheckTransaction);

      case TransactionMethods.CancelTransaction:
        return await this.cancelTransaction(reqBody as CancelTransactionDto);

      case TransactionMethods.GetStatement:
        return await this.getStatement(reqBody as GetStatement);
      case TransactionMethods.PerformTransaction:
        return await this.performTransaction(reqBody as PerformTransactionDto);
      default:
        return "Invalid transaction method";
    }
  }

  async GetInformation(body: GetInformationDto) {
    try {
      const client = await this.prismaService.users.findFirst({
        where: {
          id: body.params.fields.user_id,
        },
      });

      if (!client) {
        return {
          jsonrpc: "2.0",
          id: body.id,
          error: PaynetError.ClientNotFound,
        };
      }
      const now = new Date();

      const formatted = format(now, "yyyy-MM-dd HH:mm:ss");
      return {
        jsonrpc: "2.0",
        id: body.id,
        result: {
          status: "0",
          timestamp: formatted,
          fields: {
            user_id: Number(client.id),
            balance: client.balance,
            fio:
              client.first_name.length >= 20
                ? String(client.first_name.slice(0, 20))
                : String(client.first_name),
            username: client.username ? "@" + client.username : "nomalum",
            phone: client.phone_number ? client.phone_number : "nomalum",
          },
        },
      };
    } catch (error) {
      return {
        jsonrpc: "2.0",
        id: body.id,
        error: PaynetError.ValidationErrorParam1,
      };
    }
  }
  async checkTransaction(body: CheckTransaction) {
    this.logger.log(this.checkTransaction.name, body);
    const transaction = await this.prismaService.transaction.findFirst({
      where: {
        transactionId: String(body.params.transactionId),
        provider: "PAYNETUZ",
      },
    });
    if (!transaction) {
      return {
        jsonrpc: "2.0",
        id: body.id,
        error: PaynetError.TransactionNotFound,
      };
    }

    return {
      jsonrpc: "2.0",
      id: body.id,
      result: {
        transactionState:
          transaction.status == "PAID"
            ? TransactionState.SUCCESS
            : transaction.status == "CANCELED"
            ? TransactionState.CANCELLED
            : TransactionState.NOT_FOUND,
        timestamp: format(transaction.updatedAt, "yyyy-MM-dd HH:mm:ss"),
        providerTrnId: transaction.id,
      },
    };
  }
  async performTransaction(body: PerformTransactionDto) {
    // this.logger.log(this.performTransaction.name, body);

    if (body.params.amount / 100 < 1000) {
      return {
        jsonrpc: "2.0",
        id: body.id,
        error: PaynetError.InvalidAmount,
      };
    }

    const transaction = await this.prismaService.transaction.findFirst({
      where: {
        transactionId: body.params.transactionId.toString(),
      },
      include: {
        user: true,
      },
    });

    if (transaction) {
      return {
        jsonrpc: "2.0",
        id: body.id,
        error: PaynetError.TransactionAlreadyExists,
      };
    }
    const user = await this.prismaService.users.findFirst({
      where: {
        id: body.params.fields.user_id,
      },
    });
    if (!user) {
      return {
        jsonrpc: "2.0",
        id: body.id,
        error: PaynetError.ClientNotFound,
      };
    }

    const newtransaction = await this.prismaService.transaction.create({
      data: {
        transactionId: body.params.transactionId.toString(),
        provider: "PAYNETUZ",
        prepareId: BigInt(body.id),
        amount: body.params.amount / 100,
        userId: body.params.fields.user_id,
        status: "PAID",
      },
    });

    await this.prismaService.users.update({
      data: {
        balance: {
          increment: newtransaction.amount,
        },
      },
      where: {
        id: body.params.fields.user_id,
      },
    });

    return {
      jsonrpc: "2.0",
      id: body.id,
      result: {
        timestamp: format(newtransaction.createdAt, "yyyy-MM-dd HH:mm:ss"),
        providerTrnId: newtransaction.id,
        fields: {
          user_id: body.params.fields.user_id,
        },
      },
    };
  }
  async cancelTransaction(body: CancelTransactionDto) {
    const transaction = await this.prismaService.transaction.findFirst({
      where: {
        transactionId: String(body.params.transactionId),
        provider: "PAYNETUZ",
      },
      include: {
        user: true,
      },
    });
    if (!transaction) {
      return {
        jsonrpc: "2.0",
        id: body.id,
        error: PaynetError.TransactionNotFound,
      };
    }

    if (transaction.status == "CANCELED") {
      return {
        jsonrpc: "2.0",
        // id: body.id,
        error: PaynetError.CanceladPayment,
      };
    }
    const client_balance = transaction.user.balance;
    if (client_balance >= transaction.amount) {
      const trans = await this.prismaService.transaction.update({
        where: {
          id: transaction.id,
        },
        data: {
          status: "CANCELED",
        },
      });
      await this.prismaService.users.update({
        where: {
          id: BigInt(transaction.user.id),
        },
        data: {
          balance: {
            decrement: transaction.amount,
          },
        },
      });
      return {
        jsonrpc: "2.0",
        id: body.id,
        result: {
          providerTrnId: transaction.id,
          timestamp: format(trans.updatedAt, "yyyy-MM-dd HH:mm:ss"),
          transactionState: TransactionState.CANCELLED,
        },
      };
    }
    return {
      jsonrpc: "2.0",
      id: body.id,
      error: PaynetError.INSUFFICIENT_FUNDS_FOR_CANCEL,
    };
  }
  async getStatement(body: GetStatement) {
    // console.log({
    //   dateFrom: new Date(body.params.dateFrom),
    //   dateTo: new Date(body.params.dateTo),
    // });
    const transactions = await this.prismaService.transaction.findMany({
      where: {
        provider: "PAYNETUZ",
        status: "PAID",
        createdAt: {
          gte: new Date(body.params.dateFrom),
          lte: new Date(body.params.dateTo),
        },
      },
    });
    // if (transactions.length == 1) {
    //   const el = transactions[0];
    //   return {
    //     jsonrpc: '2.0',
    //     id: body.id,
    //     result: {
    //       statements: {
    //         amount: el.amount * 100,
    //         providerTrnId: el.id,
    //         transactionId: el.transactionId,
    //         timestamp: format(el.createdAt, 'yyyy-MM-dd HH:mm:ss'),
    //       },
    //     },
    //   };
    // }
    return {
      jsonrpc: "2.0",
      id: body.id,
      result: {
        statements: transactions.map((el) => ({
          amount: el.amount * 100,
          providerTrnId: el.id,
          transactionId: el.transactionId,
          timestamp: format(el.createdAt, "yyyy-MM-dd HH:mm:ss"),
        })),
      },
    };
  }
}
