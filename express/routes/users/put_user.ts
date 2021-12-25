import { Request, Response } from 'express'
import { Op } from 'sequelize'
import {
  DUPLICATE_NAME,
  NO_DATA_EXISTS,
  PARAMETER_INVALID,
  PARAMETER_UNAUTHORIZED,
} from '../../constants/error'
import { Handler } from '../../core/handler'
import { User } from '../../models/index'
import { IPutUserParams } from '../../types'
import CheckUtils from '../../utils/check'

export class PutUser {
  handler: Handler
  params: IPutUserParams

  constructor(req: Request, res: Response) {
    this.handler = new Handler(req, res)
    this.params = { ...req.params, ...req.body }
  }

  /**
   * メイン処理
   */
  async main() {
    const validParams = ['id', 'name', 'age']

    if (!CheckUtils.CheckPermissionParams(this.params, validParams)) {
      return this.handler.error(PARAMETER_UNAUTHORIZED)
    }

    if (
      !Number(this.params.id) ||
      (this.params.name ? typeof this.params.name !== 'string' : false) ||
      (this.params.age ? typeof this.params.age !== 'number' : false)
    ) {
      return this.handler.error(PARAMETER_INVALID)
    }

    const user = await User.findByPk<User>(this.params.id)
    if (!user) return this.handler.error(NO_DATA_EXISTS)

    const isDuplicateName = await this.checkDuplicateName()
    if (!isDuplicateName) return this.handler.error(DUPLICATE_NAME)

    await this.putUser()

    return this.handler.json<boolean>(true)
  }

  /**
   * nameが一致するユーザーを取得
   */
  async checkDuplicateName(): Promise<boolean> {
    if (!this.params.name) return true

    const response = await User.findAll({
      where: {
        name: this.params.name,
        id: {
          [Op.not]: this.params.id,
        },
      },
    })

    return !response.length
  }

  /**
   * ユーザー情報を更新
   */
  async putUser(): Promise<boolean> {
    const value = {
      name: this.params.name,
      age: this.params.age,
    }

    const response = await User.update(value, {
      where: {
        id: this.params.id,
      },
    })

    return Boolean(response[0])
  }
}
