export enum PaynetStatusCode {
  // Метод запроса не POST
  METHOD_NOT_POST = -32300,

  // Ошибка парсинга JSON
  JSON_PARSE_ERROR = -32700,

  // В RPC-запросе отсутствуют обязательные поля или тип полей не соответствует спецификации
  INVALID_RPC_REQUEST = -32600,

  // Запрашиваемый метод не найден
  METHOD_NOT_FOUND = -32601,

  // Отсутствуют обязательные поля параметров
  MISSING_PARAMS = -32602,

  // Системная (внутренняя ошибка)
  INTERNAL_ERROR = -32603,

  // Проведено успешно
  SUCCESS = 0,

  // Недостаточно средств на счету клиента для отмены платежа
  INSUFFICIENT_FUNDS_FOR_CANCEL = 77,

  // Услуга временно не поддерживается
  SERVICE_TEMPORARILY_UNAVAILABLE = 100,

  // Квота исчерпана
  QUOTA_EXCEEDED = 101,

  // Системная ошибка
  SYSTEM_ERROR = 102,

  // Неизвестная ошибка
  UNKNOWN_ERROR = 103,

  // Кошелёк не идентифицирован
  WALLET_NOT_IDENTIFIED = 113,

  // The monthly limit is exceeded for this
  MONTHLY_LIMIT_EXCEEDED = 140,

  // The daily limit is exceeded for this account
  DAILY_LIMIT_EXCEEDED = 141,

  // Транзакция уже существует
  TRANSACTION_ALREADY_EXISTS = 201,

  // Транзакция уже отменена
  TRANSACTION_ALREADY_CANCELLED = 202,

  // Транзакция не найдена
  TRANSACTION_NOT_FOUND = 203,

  // Номер не существует
  NUMBER_NOT_FOUND = 301,

  // Клиент не найден
  CLIENT_NOT_FOUND = 302,

  // Товар не найден
  PRODUCT_NOT_FOUND = 304,

  // Услуга не найдена
  SERVICE_NOT_FOUND = 305,

  // Ошибка валидации параметра 1
  VALIDATION_ERROR_PARAM_1 = 401,

  // Ошибка валидации параметра 2
  VALIDATION_ERROR_PARAM_2 = 402,

  // Ошибка валидации параметра 3
  VALIDATION_ERROR_PARAM_3 = 403,

  // Ошибка валидации параметра 4
  VALIDATION_ERROR_PARAM_4 = 404,

  // Ошибка валидации параметра 5
  VALIDATION_ERROR_PARAM_5 = 405,

  // Ошибка валидации параметра 6
  VALIDATION_ERROR_PARAM_6 = 406,

  // Ошибка валидации параметра 7
  VALIDATION_ERROR_PARAM_7 = 407,

  // Ошибка валидации параметра 8
  VALIDATION_ERROR_PARAM_8 = 408,

  // Ошибка валидации параметра 9
  VALIDATION_ERROR_PARAM_9 = 409,

  // Ошибка валидации параметра 10
  VALIDATION_ERROR_PARAM_10 = 410,

  // Не заданы один или несколько обязательных параметров
  REQUIRED_PARAMS_MISSING = 411,

  // Неверный логин или пароль
  INVALID_CREDENTIALS = 412,

  // Неверная сумма
  INVALID_AMOUNT = 413,

  // Неверный формат даты и времени
  INVALID_DATETIME_FORMAT = 414,

  // Сумма превышает максимальный лимит
  AMOUNT_EXCEEDS_LIMIT = 415,

  // Транзакции запрещены для данного плательщика
  TRANSACTIONS_FORBIDDEN = 501,

  // Доступ запрещен
  ACCESS_DENIED = 601,

  // Неправильный код команды
  INVALID_COMMAND_CODE = 603,
}
