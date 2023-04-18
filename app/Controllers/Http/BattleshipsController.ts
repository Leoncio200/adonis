import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Enfrentamiento from 'App/Models/Enfrentamiento';
import { schema,rules } from '@ioc:Adonis/Core/Validator';
import Database from '@ioc:Adonis/Lucid/Database';
import Event from '@ioc:Adonis/Core/Event';
import User from 'App/Models/User';
export default class BattleshipsController {
    public async CrearEnfrentamiento({ request, response, auth }: HttpContextContract){
        const validationSchema = schema.create({
            nombre: schema.string({}, [
                rules.required(),
                rules.maxLength(50),
            ]),
        })
    
        try {
            await request.validate({
            schema: validationSchema,
            })
        } catch (error) {
            return response.badRequest(error.messages)
        }
        
        const enfrentamiento = await Enfrentamiento.create({
            nombre: request.input("nombre")
        })
        
        const user = await auth.authenticate()
        const foundUser = await User.find(user?.id)

        await Database.table('enfrentamientos_enlazados').insert({
            turno: 1,
            id_enfrentamientos: enfrentamiento.id,
            id_user: foundUser?.id
        })

        return response.created({
            Status: 201,
            Msg: 'Se a creado la partida de forma exitosa'
        });
    }

    public async SeleccionarEnfrentamiento({ params, response }: HttpContextContract) {
        const id = params.id || 0;
        if (id === 0) {
            const partidas = await Database
            .query()
            .select('enfrentamientos.*')
            .from('enfrentamientos')
            return response.status(200).json({
            Status: 200,
            Data: partidas
            });
        }
        const partida = await Enfrentamiento.find(id);
        if (partida) {
            return response.status(200).json({
            Status: 200,
            Data: partida
            });
        }
        return response.status(404).json({
            Status: 404,
            Msg: 'Partida no encontrada'
        });
    }

    public async Sala({ params, response, request }: HttpContextContract) {
            const id = request.param('id');
            const sala = await Database
            .from('enfrentamientos_enlazados')
            .join('users', 'users.id', '=', 'enfrentamientos_enlazados.id_user')
            .select('users.id', 'enfrentamientos_enlazados.turno', 'users.name')
            .where('enfrentamientos_enlazados.id_enfrentamientos', id)
            return response.status(200).json({
            Status: 200,
            Data: sala
            });
    }

    public async UnirseEnfrentamiento({ request, response, auth }: HttpContextContract){

        const capacidad = await Database
        .from('enfrentamientos_enlazados')
        .count('* as total')
        .where('enfrentamientos_enlazados.id_enfrentamientos', request.param('id'))

        if(capacidad[0].total >= 2)
        return response.status(400).json({
            Status: 400,
            Msg: 'Capacidad maxima alcanzada'
        });

        const user = await auth.authenticate()
        const foundUser = await User.find(user?.id)

        await Database.table('enfrentamientos_enlazados').insert({
            turno: 2,
            id_enfrentamientos: request.param('id'),
            id_user: foundUser?.id
        })

        return response.created({
            Status: 201,
            Msg: 'Unido de forma exitosa'
        });
    }

    public async Ataque({ request, response }: HttpContextContract){
        const validationSchema = schema.create({
            X: schema.string(),
            Y: schema.number(),
            turno: schema.number(),
            ataque: schema.boolean(),
            hit: schema.boolean()
        });
    
        try {
            await request.validate({
                schema: validationSchema,
            });
        } catch (error) {
            return response.badRequest(error.messages);
        }
        
        Event.emit('message', {
            Y: request.input('Y'), 
            X: request.input('X'), 
            turno: request.input('turno'),
            ataque: request.input('ataque'),
            hit: request.input('hit')
        });
    }
    

    public async jugador({ request, response, auth }: HttpContextContract){

        const user = await auth.authenticate()
        const foundUser = await User.find(user?.id)

        const jugador = await Database
        .from('enfrentamientos_enlazados')
        .join('users', 'users.id', '=', 'enfrentamientos_enlazados.id_user')
        .select('users.id', 'enfrentamientos_enlazados.turno', 'users.name')
        .where('enfrentamientos_enlazados.id_enfrentamientos', request.param('id'))
        .andWhere('enfrentamientos_enlazados.id_user', foundUser!.id)

        if(!jugador[0]){
            return response.status(404).json({
                Status: 404,
                Msg: 'Jugador no encontrado'
            });
        }
        return response.status(200).json(jugador[0]);
    }

    
}
