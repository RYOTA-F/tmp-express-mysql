import { Request, Response } from 'express'
import { NO_DATA_EXISTS } from '../../constants/error'
import { Handler } from '../../core/handler'
import { User } from '../../models/index'

export class DeleteUser {
  handler: Handler
  id: number

  constructor(req: Request, res: Response) {
    this.handler = new Handler(req, res)
    this.id = Number(req.params.id)
  }

  /**
   * メイン処理
   */
  async main() {
    const user = await User.findByPk(this.id)
    if (!user) return this.handler.error(NO_DATA_EXISTS)

    const data = await this.deleteUser(user)
    return this.handler.json<boolean>(data)
  }

  /**
   * ユーザーを削除
   */
  async deleteUser(deleteUser: User): Promise<boolean> {
    const response = await deleteUser.destroy()

    return Boolean(response)
  }
}
