import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import fetch from 'node-fetch';
import User from 'App/Models/User';
import { schema,rules } from '@ioc:Adonis/Core/Validator';
import Database from '@ioc:Adonis/Lucid/Database';
import Cliente from 'App/Models/Cliente';
import Provedor from 'App/Models/Provedor';
import Empleado from 'App/Models/Empleado';
import Producto from 'App/Models/Producto';
import Compra from 'App/Models/Compra';
import Alumno from 'App/Models/Alumno';
import Event from '@ioc:Adonis/Core/Event';
import Partida from 'App/Models/Partida';
import UserPartida from 'App/Models/UserPartida';

export default class InsertarController {
    public async Validacion({ request, response }: HttpContextContract) {
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


      public async insertarClientes({ request, response }: HttpContextContract, Tok: string = '') {
        const validationSchema = schema.create({
          Nombre: schema.string(),
          Ap_paterno: schema.string(),
          Ap_materno: schema.string.optional(),
          Correo: schema.string(),
          Telefono: schema.number(),
        });
      
        try {
          await request.validate({
            schema: validationSchema,
          });
        } catch (error) {
          return response.badRequest(error.messages);
        }
      
        if (request.ip() == '192.168.43.126') {
          const response = await fetch('http://192.168.43.230:1030/api/search/cliente', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Tok}`,
            },
            body: JSON.stringify({
              Nombre: request.input('Nombre'),
              Ap_paterno: request.input('Ap_paterno'),
              Ap_materno: request.input('Ap_materno'),
              Correo: request.input('Correo'),
              Telefono: request.input('Telefono'),
            }),
          });
      
          if (!response.ok) {
            return response.notFound(response.statusText);
          }
        }
      
        await Database.table('clientes').insert({
          Nombre: request.input('Nombre'),
          Ap_paterno: request.input('Ap_paterno'),
          Ap_materno: request.input('Ap_materno'),
          Correo: request.input('Correo'),
          Numero: request.input('Telefono'),
          Status: 1,
        });
      
        const cliente = await Cliente.findBy('Correo', request.input('Correo'));
      
        return response.created({
          Status: 201,
          Msg: 'Los datos se insertaron de forma exitosa',
          Data: cliente,
        });
      }



      public async insertarProvedores({ request, response }: HttpContextContract, Tok: string = '') {
        const validationSchema = schema.create({
            Nombre: schema.string(),
            Direccion: schema.string(),
            Telefono: schema.number(),
        });
    
        try {
            await request.validate({
                schema: validationSchema,
            });
        } catch (error) {
            return response.badRequest(error.messages);
        }
    
        if (request.ip() === '192.168.43.126') {
            const res = await fetch('http://192.168.43.230:1030/api/search/provedor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Tok}`,
                },
                body: JSON.stringify({
                    Nombre: request.input('Nombre'),
                    Direccion: request.input('Direccion'),
                    Telefono: request.input('Telefono'),
                }),
            });
    
            if (!res.ok) {
              
                return response.notFound(res.statusText);
            }
        }
    
        const provedor = new Provedor();
        provedor.Nombre = request.input('Nombre');
        provedor.Direccion = request.input('Direccion');
        provedor.Telefono = request.input('Telefono');
        provedor.Status = 1;
        await provedor.save();
    
        return response.created({
            Status: 201,
            Msg: 'Los datos se insertaron de forma exitosa',
            Data: provedor,
        });
    }

    public async insertarEmpleados({ request, response }: HttpContextContract, Tok: string = '') {
        const validationSchema = schema.create({
            Nombre: schema.string(),
            Ap_paterno: schema.string(),
            Ap_materno: schema.string.optional(),
            Edad: schema.number(),
            Correo: schema.string(),
            Telefono: schema.number(),
        })
    
        try {
            await request.validate({
                schema: validationSchema,
            })
        } catch (error) {
            return response.badRequest(error.messages)
        }
    
        if (request.ip() === '192.168.43.126') {
            const fetchResponse = await fetch('http://192.168.43.230:1030/api/search/empleado', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Tok}`,
                },
                body: JSON.stringify({
                    Nombre: request.input('Nombre'),
                    Ap_paterno: request.input('Ap_paterno'),
                    Ap_materno: request.input('Ap_materno'),
                    Edad: request.input('Edad'),
                    Correo: request.input('Correo'),
                    Telefono: request.input('Telefono'),
                }),
            })
            if (!fetchResponse.ok) {
                return response.notFound(fetchResponse.statusText)
            }
        }
    
        await Database.table('empleados').insert({
            Nombre: request.input('Nombre'),
            Ap_paterno: request.input('Ap_paterno'),
            Ap_materno: request.input('Ap_materno'),
            Edad: request.input('Edad'),
            Correo: request.input('Correo'),
            Numero: request.input('Telefono'),
            Status: 1,
        })
    
        const empleado = await Empleado.findBy('Correo', request.input('Correo'))
    
        return response.created({
            Status: 201,
            Msg: 'Los datos se insertaron de forma exitosa',
            Data: empleado,
        })
    }
    

    public async insertarProductos({ request, response }: HttpContextContract, Tok: string = '') {
        const validationSchema = schema.create({
          Nombre: schema.string(),
          Stock: schema.number(),
          Precio: schema.number(),
          Marca: schema.number(),
        })
    
        try {
          await request.validate({
            schema: validationSchema,
          })
        } catch (error) {
          return response.badRequest(error.messages)
        }
    
        if (request.ip() === '192.168.43.126') {
          const fetchResponse = await fetch('http://192.168.43.230:1030/api/search/producto', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Tok}`,
            },
            body: JSON.stringify({
              Nombre: request.input('Nombre'),
              Stock: request.input('Stock'),
              Precio: request.input('Precio'),
              Marca: request.input('Marca'),
            }),
          })
    
          if (!fetchResponse.ok) {
            return response.notFound(fetchResponse.statusText)
          }
        }
    
        const provedor = await Provedor.find(request.input('Marca'))
    
        if (!provedor) {
          return response.badRequest('Provedor no encontrado')
        }
    
        const producto = new Producto()
    
        producto.Nombre = request.input('Nombre')
        producto.Stock = request.input('Stock')
        producto.Precio = request.input('Precio')
        producto.Marca = request.input('Marca')
        producto.Status = 1
    
        await producto.save()
    
        return response.created({
          Status: 201,
          Msg: 'Los datos se insertaron de forma exitosa',
          Data: producto,
        })
      }


      public async insertarCompras({ request, response }: HttpContextContract, Tok: string = '') {
        const validationSchema = schema.create({
          Cliente: schema.number(),
          Producto: schema.number(),
          Cantidad: schema.number(),
          Empleado: schema.number(),
        })
    
        try {
          await request.validate({
            schema: validationSchema,
          })
        } catch (error) {
          return response.badRequest(error.messages)
        }
    
        if (request.ip() == '192.168.43.126') {
          const apiResponse = await fetch('http://192.168.43.230:1030/api/search/compra', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${Tok}`,
            },
            body: JSON.stringify({
              Cliente: request.input('Cliente'),
              Producto: request.input('Producto'),
              Cantidad: request.input('Cantidad'),
              Empleado: request.input('Empleado'),
            }),
          })
    
          if (!apiResponse.ok) {
            return response.status(apiResponse.status).json({
              Status: apiResponse.status,
              Msg: 'Inserción fallida',
            })
          }
        }
    
        const ClienteInstance = await Cliente.find(request.input('Cliente'))
        if (!ClienteInstance) {
          return response.status(400).json({
            Status: 400,
            Msg: 'Cliente no encontrado',
          })
        }
    
        const ProductoInstance = await Producto.find(request.input('Producto'))
        if (!ProductoInstance) {
          return response.status(400).json({
            Status: 400,
            Msg: 'Producto no encontrado',
          })
        }

        
    
        const EmpleadoInstance = await Empleado.find(request.input('Empleado'))
        if (!EmpleadoInstance) {
          return response.status(400).json({
            Status: 400,
            Msg: 'Empleado no encontrado',
          })
        }

        

    
        const MontoTotal = request.input('Cantidad') * 2
        const ComprasInstance = new Compra()
        ComprasInstance.Cliente = request.input('Cliente')
        ComprasInstance.Producto = request.input('Producto')
        ComprasInstance.Cantidad = request.input('Cantidad')
        ComprasInstance.MontoTotal = MontoTotal
        ComprasInstance.Empleado = request.input('Empleado')
        await ComprasInstance.save()
    
        return response.created({
          Status: 201,
          Msg: 'Los datos se insertaron de forma exitosa',
          Data: ComprasInstance,
        })
      }
    

      insertarAlumno({ request, response }: HttpContextContract) {
        const validationSchema = schema.create({
          nombre: schema.string(),
          edad: schema.number(),
          telefono: schema.number(),
        })
    
        try {
          request.validate({
            schema: validationSchema,
          })
        } catch (error) {
          return response.badRequest(error.messages)
        }
    
        const alumno = new Alumno()
        alumno.nombre = request.input('nombre')
        alumno.edad = request.input('edad')
        alumno.telefono = request.input('telefono')
        alumno.Status = 1
        alumno.save()

        Event.emit('message', "alumno nuevo")
    
        return response.created({
          Status: 201,
          Msg: 'Los datos se insertaron de forma exitosa',
          Data: alumno,
        })
      }


      insertarPartida({ request, response }: HttpContextContract) {
        const validationSchema = schema.create({
          ventana1: schema.string(),
          ventana2: schema.string(),
        })

        try {
          request.validate({
            schema: validationSchema,
          })
        } catch (error) {
          return response.badRequest(error.messages)
        }

        const partida = new Partida()
        partida.ventana1 = request.input('ventana1')
        partida.ventana2 = request.input('ventana2')
        partida.Status = 1
        partida.save()

        Event.emit('message', "partida nueva")

        return response.created({
          Status: 201,
          Msg: 'Los datos se insertaron de forma exitosa',
          Data: partida,
        })

      }

      insertarJugador({ request, response }: HttpContextContract) {
        const validationSchema = schema.create({
          id_partida: schema.number(),
          nombre: schema.string(),
          turno: schema.number(),
        })
        
        try {
          request.validate({
            schema: validationSchema,
          })
        } catch (error) {
          return response.badRequest(error.messages)
        }
        const jugador = new UserPartida()
        jugador.id_partida = request.input('id_partida')
        jugador.nombre = request.input('nombre')
        jugador.turno = request.input('turno')
        jugador.save()
        
        Event.emit('message', "nuevo jugador")
      }
    
}
