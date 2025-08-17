import { CancelTransactionDto } from '../dto/cancelTransaction.dto';
import { CheckTransaction } from '../dto/checkTransaction.dto';
import { GetInformationDto } from '../dto/getinformation.dto';

import { GetStatement } from '../dto/getStatement.dto';
import { PerformTransactionDto } from '../dto/performTransaction.dto';
// import { PerformTransactionDto } from '../dto/perform-transaction.dto';

export type RequestBody =
  | CancelTransactionDto
  | GetStatement
  | PerformTransactionDto
  | CheckTransaction
  | GetInformationDto;
