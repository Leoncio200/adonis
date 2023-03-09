// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Hash from '@ioc:Adonis/Core/Hash'
export default class LoginController {
    axios = require ('axios')
    telefono: any
    numero: any
    public async Login({ auth, request, response }){
        const { email, password } = request.all();
        const user = await User.findBy('email', email)
        if (!user) {
            return response.unauthorized('usuario inexistente')
        }
        const isPasswordValid = await Hash.verify(user.password, password) 
        try {
            if (isPasswordValid) {
                const token = await auth.use('api').generate(user)
                return response.json({
                    status: 200,
                    message: "Usuario logeado exitosamente",
                    token: token.token,
                    user: token.user
                })
                } else {
                    return response.unauthorized('Usuario o contraseña incorrectos')
                }
          } catch {
            return response.unauthorized('a ocurrido un error')
          }
      
    }
    
    public async user({ request, response }){
        const numero_aleatorio = Math.random()*(9999-1000)+1000
        const passwordHash = await Hash.make(request.input('password'))
        const user = await User.create({
            name: request.input('name'),
            email: request.input('email'),
            phone: request.input('phone'),
            rol_id: 2,
            active: 0,
            CodeTemporal: numero_aleatorio,
            password: passwordHash,
          })
        response.json({
             status: 'Usuario creado',
            usuario: user
        })
    }

    public async prueba(){
     return   {
            prueba: 'prueba'
        }
    }
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