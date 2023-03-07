// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginController {
 public async login({request, auth}: HttpContextContract){
    const {email, password} = request.all()
    
  }
}
