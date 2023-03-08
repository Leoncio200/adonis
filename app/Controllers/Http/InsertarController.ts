import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import fetch from 'node-fetch';
import User from 'App/Models/User';
import { schema } from '@ioc:Adonis/Core/Validator';
import Database from '@ioc:Adonis/Lucid/Database';


export default class InsertarController {
    public async validacion({ request, response }: HttpContextContract) {
        const validationSchema = schema.create({
          Correo: schema.string(),
          Verificacion: schema.number([schema.rules.integer()]),
        })
    
        try {
          await request.validate({
            schema: validationSchema,
          })
        } catch (error) {
          return response.badRequest(error.messages)
        }
    
        if (request.ip() === '192.168.43.126') {
          const fetchResponse = await fetch('http://192.168.43.230:1030/api/Validar', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              Correo: request.input('Correo'),
              Verificacion: request.input('Verificacion'),
            }),
          })
    
          if (!fetchResponse.ok) {
            return response.notFound(fetchResponse.statusText)
          }
        }
    
        const user = await User.findBy('email', request.input('Correo'))
    
        if (!user) {
          return response.status(400).json({
            Status: 400,
            mensage: 'Usuario no encontrado',
          })
        }
    
        if (request.input('Verificacion') !== user.CodeTemporal) {
          return response.status(400).json({
            Status: 400,
            mensage: 'Codigo de verificacion incorrecto',
          })
        }
    
        user.active = 1
        await user.save()
    
        return response.status(201).json({
          Status: 201,
          mensage: 'Usuario activado',
        })
      }
    
}
