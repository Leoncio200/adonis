// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class LoginController {
    axios = require ('axios')
    telefono: any
    numero: any
    public async Login({ response }){

        try {
            const apiResponse = await this.axios.post('https://rest.nexmo.com/sms/json', { 
                from:"Vonage APIs",
                text:`Codigo de verificacion: ${this.numero}`,
                to:`52${this.telefono}`,
            }, {
            auth: { username: 'ddaea82e',
            password: 'UiZowFl15b4NhVxb' }
            })
            response.send(apiResponse.data)
        } catch (error) {
            response.status(500).send('Error al enviar el SMS')
        }
    }
}
