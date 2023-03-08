// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class LoginController {
    axios = require ('axios')
    auth = require('@adonisjs/auth/src/Auth')
    telefono: any
    numero: any
    public async Login({ request, response }){
        const { email, password } = request.all();
        const user = await User.findBy('email', email)
        if (!user) {
            return response.unauthorized('usuario inexistente')
        }
        try {
            const token = await this.auth.use('api').attempt(user.email, user.password)
            return token
          } catch {
            return response.unauthorized('Invalid credentials')
          }
      
    }
    
    public async user({ request, response }){
        const { name, email, password, phone } = request.all();
        const numero_aleatorio = Math.random()*(9999-1000)+1000
        const user = await User.create({
            name: name,
            email: email,
            phone: phone,
            rol_id: 2,
            active: 0,
            verification_code: numero_aleatorio,
            password: password
    })
}


//telefono = request.telefono
//        try {
//            const apiResponse = await this.axios.post('https://rest.nexmo.com/sms/json', { 
//                from:"Vonage APIs",
//                text:`Codigo de verificacion: ${this.numero}`,
//                to:`52${this.telefono}`,
//            }, {
//            auth: { username: 'ddaea82e',
//            password: 'UiZowFl15b4NhVxb' }
//            })
//            response.json({
//                status:apiResponse.status})
//        } catch (error) {
//            response.status(500).send('Error al enviar el SMS')
//        }