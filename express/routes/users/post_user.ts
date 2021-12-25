import { Request, Response } from 'express'
import {
  PARAMETER_NOT_MAYCH,
  DUPLICATE_NAME,
  PARAMETER_INVALID,
} from '../../constants/error'
import { Handler } from '../../core/handler'
import { User } from '../../models/index'
import { IPostUserParams } from '../../types'
import CheckUtils from '../../utils/check'

export class PostUser {
  handler: Handler
  params: IPostUserParams

  constructor(req: Request, res: Response) {
    this.handler = new Handler(req, res)
    this.params = { ...req.params, ...req.body }
  }

  /**
   * メイン処理
   */
  async main() {
    const validParams = ['name', 'age']

    if (!CheckUtils.CheckMatchParams(this.params, validParams)) {
      return this.handler.error(PARAMETER_NOT_MAYCH)
    }

    if (
      typeof this.params.name !== 'string' ||
      typeof this.params.age !== 'number'
    ) {
      return this.handler.error(PARAMETER_INVALID)
    }

    const isDuplicateName = await this.checkDuplicateName()
    if (!isDuplicateName) return this.handler.error(DUPLICATE_NAME)

    const data = await this.createUser()

    return this.handler.json<number>(data)
  }

  /**
   * nameが一致するユーザーを取得
   */
  async checkDuplicateName(): Promise<boolean> {
    const response = await User.findAll({
      where: {
        name: this.params.name,
      },
    })

    return !response.length
  }

  /**
   * ユーザーを新規作成
   */
  async createUser(): Promise<number> {
    const response = await User.create({ ...this.params })

    return response.id
  }
}
