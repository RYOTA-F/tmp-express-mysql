export default class CheckUtils {
  constructor() {}

  /**
   * 許可されていないパラメータがあるかチェック
   */
  static CheckPermissionParams(params: {}, validParams: string[]): boolean {
    return Object.keys(params).every((Key) => validParams.includes(Key))
  }

  /**
   * パラメーターが一致しているかチェック
   */
  static CheckMatchParams(params: {}, validParams: string[]): boolean {
    return validParams.every((key) => Object.keys(params).includes(key))
  }
}
