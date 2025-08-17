import { TransactionMethods } from '../constants/transaction-methods';

export class GetInformationDto {
  id: number;
  jsonrpc: '2.0';
  method: TransactionMethods;
  params: {
    serviceId: number;
    fields: {
      user_id: number;
    };
  };
}
