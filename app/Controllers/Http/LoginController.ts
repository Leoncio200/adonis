// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
export default class LoginController {
    usuario = require('App/Models/User')
    axios = require ('axios')
    jwt = require('jsonwebtoken')
    telefono: any
    numero: any
    public async Login({ request, response }){
        const { email, password } = request.all();
    
        try {
        const user = await this.usuario.findBy('email', email);
        if (!user) {
            return response.status(401).json({ message: 'Invalid credentials' });
        }
        
        const passwordValid = await user.verifyPassword(password);
        if (!passwordValid) {
            return response.status(401).json({ message: 'Invalid credentials' });
        }
        
        const token = this.jwt.sign({ userId: user.id }, 'secret');
        return response.json({ token });
        } catch (error) {
        return response.status(500).json({ message: 'Something went wrong' });
        }
      
    }
    
    public async User({ request, response }){
        telefono = request.telefono
        try {
            const apiResponse = await this.axios.post('https://rest.nexmo.com/sms/json', { 
                from:"Vonage APIs",
                text:`Codigo de verificacion: ${this.numero}`,
                to:`52${this.telefono}`,
            }, {
            auth: { username: 'ddaea82e',
            password: 'UiZowFl15b4NhVxb' }
            })
            response.json({
                status:apiResponse.status})
        } catch (error) {
            response.status(500).send('Error al enviar el SMS')
        }
        }
}


