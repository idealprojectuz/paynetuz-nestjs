import { PaynetStatusCode } from './error_status_codes';

export const PaynetError = {
  InvalidAmount: {
    code: PaynetStatusCode.INVALID_AMOUNT,
    message: "Noto'g'ri summa",
  },
  CanceladPayment: {
    code: PaynetStatusCode.TRANSACTION_ALREADY_CANCELLED,
    message: 'Tranzaksiya bekor qilingan',
  },
  WalletNotIdentified: {
    code: PaynetStatusCode.WALLET_NOT_IDENTIFIED,
    message: 'Hamyon aniqlanmadi',
  },
  DailyLimitExceeded: {
    code: PaynetStatusCode.DAILY_LIMIT_EXCEEDED,
    message: 'Kunlik limit oshib ketdi',
  },
  MonthlyLimitExceeded: {
    code: PaynetStatusCode.MONTHLY_LIMIT_EXCEEDED,
    message: 'Oylik limit oshib ketdi',
  },
  TransactionAlreadyExists: {
    code: PaynetStatusCode.TRANSACTION_ALREADY_EXISTS,
    message: 'Tranzaksiya allaqachon mavjud',
  },
  TransactionNotFound: {
    code: PaynetStatusCode.TRANSACTION_NOT_FOUND,
    message: 'Tranzaksiya topilmadi',
  },
  ProductNotFound: {
    code: PaynetStatusCode.PRODUCT_NOT_FOUND,
    message: 'Mahsulot topilmadi',
  },
  ServiceNotFound: {
    code: PaynetStatusCode.SERVICE_NOT_FOUND,
    message: 'Usluga topilmadi',
  },
  ValidationErrorParam1: {
    code: PaynetStatusCode.VALIDATION_ERROR_PARAM_1,
    message: '1-parametrda xatolik',
  },
  ValidationErrorParam2: {
    code: PaynetStatusCode.VALIDATION_ERROR_PARAM_2,
    message: '2-parametrda xatolik',
  },
  RequiredParamsMissing: {
    code: PaynetStatusCode.REQUIRED_PARAMS_MISSING,
    message: 'Majburiy parametrlar ko‘rsatilmagan',
  },
  InvalidCredentials: {
    code: PaynetStatusCode.INVALID_CREDENTIALS,
    message: 'Login yoki parol noto‘g‘ri',
  },
  InvalidDateTimeFormat: {
    code: PaynetStatusCode.INVALID_DATETIME_FORMAT,
    message: 'Sana yoki vaqt formati noto‘g‘ri',
  },
  AmountExceedsLimit: {
    code: PaynetStatusCode.AMOUNT_EXCEEDS_LIMIT,
    message: 'Summaning maksimal limiti oshib ketgan',
  },
  TransactionsForbidden: {
    code: PaynetStatusCode.TRANSACTIONS_FORBIDDEN,
    message: 'Ushbu foydalanuvchi uchun tranzaksiyalar taqiqlangan',
  },
  AccessDenied: {
    code: PaynetStatusCode.ACCESS_DENIED,
    message: 'Kirish taqiqlangan',
  },
  InvalidCommandCode: {
    code: PaynetStatusCode.INVALID_COMMAND_CODE,
    message: 'Buyruq kodi noto‘g‘ri',
  },
  ClientNotFound: {
    code: PaynetStatusCode.CLIENT_NOT_FOUND,
    message: 'Foydalanuvchi mavjud emas',
  },
  INSUFFICIENT_FUNDS_FOR_CANCEL: {
    code: PaynetStatusCode.INSUFFICIENT_FUNDS_FOR_CANCEL,
    message:
      'To‘lovni bekor qilish uchun mijozning hisobida mablag‘ yetarli emas',
  },
};
