export default class CheckUtils {
  constructor() {}

  static CheckPermissionParams(params: {}, validParams: string[]): boolean {
    return Object.keys(params).every((Key) => validParams.includes(Key))
  }
}
