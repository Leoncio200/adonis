import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
export default class Rol {
  public async handle({auth, response}: HttpContextContract, next: () => Promise<void>, allowedRoles: number[]) {
    const uth = auth.use('api').user
    const user = await User.find(uth?.id)
    if (!user || !user.hasRole(...allowedRoles)) {
      return response.status(400).send({ error: "No tienes permisos para realizar esta acción"})
    }
    await next()
  }
}
