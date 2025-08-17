import { TransactionMethods } from '../constants/transaction-methods';

export class GetStatement {
  id: number;
  jsonrpc: '2.0';
  method: TransactionMethods;
  params: {
    serviceId: string;
    dateFrom: string;
    dateTo: string;
  };
}
