import { TransactionMethods } from '../constants/transaction-methods';

export class PerformTransactionDto {
  id: number;
  jsonrpc: '2.0';
  method: TransactionMethods;
  params: {
    serviceId: number;
    transactionId: number;
    amount: number;
    fields: {
      user_id: number;
    };
  };
}
