export type ErrorCode = {
  status: number
  type: string
  message: string
}

/**
 * パラメーターが誤っている場合のエラー
 */
export const PARAMETER_INVALID: ErrorCode = {
  status: 400,
  type: 'PARAMETER_INVALID',
  message: 'The parameter is invalid.',
}

/**
 * 許可されないパラメーターの場合のエラー
 */
export const PARAMETER_UNAUTHORIZED: ErrorCode = {
  status: 400,
  type: 'PARAMETER_UNAUTHORIZED',
  message: 'The parameter is Unauthorized.',
}

/**
 * データが存在しない場合のエラー
 */
export const NO_DATA_EXISTS: ErrorCode = {
  status: 400,
  type: 'NO_DATA_EXISTS',
  message: 'No data exists.',
}

/**
 * 名前が重複している場合のエラー
 */
export const DUPLICATE_NAME: ErrorCode = {
  status: 400,
  type: 'DUPLICATE_NAME',
  message: 'Duplicate Name.',
}
