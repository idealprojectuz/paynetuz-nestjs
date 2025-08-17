import { TransactionMethods } from '../constants/transaction-methods';

export class CancelTransactionDto {
  id: number;
  jsonrpc: '2.0';
  method: TransactionMethods;
  params: {
    serviceId: number;
    transactionId: number;
    timestamp: string;
  };
}
