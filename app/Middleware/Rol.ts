import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class RolMiddleware {
  public async handle ({ auth, response }: HttpContextContract, next: () => Promise<void>, ...roles: string[]) {
    const user = await auth.authenticate()
    const rolesAsNumbers = roles.map(role => parseInt(role))
    const foundUser = await User.find(user?.id)

    if (!foundUser || !(await foundUser.hasRole(...rolesAsNumbers))) {
      return response.status(400).send('Permiso Denegado')
    }

    await next()
  }
}