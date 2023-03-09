import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
export default class Rol {
  public async handle({auth, response}: HttpContextContract, next: () => Promise<void>, allowedRoles: number[]) {
    let uth = auth.use('api').user
    let user = await User.find(uth?.id)
    if (!user?.hasRole(...allowedRoles)) {
      return response.status(400).send({ error: "No tienes permisos para realizar esta acción"})
    }
    return response.status(400).send({ error: allowedRoles})

    await next()
  }
}
