import Cliente from 'App/Models/Cliente';
import Producto from 'App/Models/Producto';
import Provedor from 'App/Models/Provedor';
import Empleado from 'App/Models/Empleado';
import User from 'App/Models/User';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { schema } from '@ioc:Adonis/Core/Validator';
import Database from '@ioc:Adonis/Lucid/Database';


export default class CambiarController {
    
    public async CambiarCliente({ request, response }: HttpContextContract, Tok: string = "") {
        const id = request.param('id');
        const validationSchema = schema.create({
          Nombre: schema.string(),
          Ap_paterno: schema.string(),
          Ap_materno: schema.string(),
          Correo: schema.string(),
          Numero: schema.number()
        });
      
        try {
          await request.validate({
            schema: validationSchema,
          });
        } catch (error) {
          return response.badRequest(error.messages);
        }
      
        const cliente = await Cliente.find(id);
        if (cliente) {
          cliente.Nombre = request.input("Nombre") || cliente.Nombre;
          cliente.Ap_paterno = request.input("Ap_paterno") || cliente.Ap_paterno;
          cliente.Ap_materno = request.input("Ap_materno") || cliente.Ap_materno;
          cliente.Correo = request.input("Correo") || cliente.Correo;
          cliente.Numero = request.input("Numero") || cliente.Numero;
      
          await cliente.save();
      
          return response.status(204).json({
            Status: 204,
            Msg: "Los datos se cambiaron de forma exitosa",
            Data: cliente,
          });
        }
      
        return response.status(400).json({
          Status: 400,
          Msg: "Cliente no encontrado",
        });
      }    

      public async CambiarProducto({ request, response }: HttpContextContract, Tok: string = "") {
        const id = request.param('id')
        const validationSchema = schema.create({
          Nombre: schema.string(),
          Stock: schema.number(),
          Precio: schema.number(),
          Marca: schema.number(),
        });
      
        try {
          await request.validate({
            schema: validationSchema,
          });
        } catch (error) {
          return response.badRequest(error.messages);
        }
      
        const producto = await Producto.find(id);
      
        if (producto) {
          const provedor = await Provedor.find(request.input("Marca"));
      
          if (provedor) {
            producto.Nombre = request.input("Nombre");
            producto.Stock = request.input("Stock");
            producto.Precio = request.input("Precio");
            producto.Marca = request.input("Marca");
      
            await producto.save();
      
            return response.status(204).json({
              Status: 204,
              Msg: "Los datos se insertaron de forma exitosa",
              Data: producto,
            });
          }
      
          return response.status(400).json({
            Status: 400,
            Msg: "Provedor no encontrado",
          });
        }
      
        return response.status(400).json({
          Status: 400,
          Msg: "Producto no encontrado",
        });
      }



      public async CambiarEmpleado({ request, response }: HttpContextContract, Tok: string = "") {
        const id = request.param('id');
        const validationSchema = schema.create({
          Nombre: schema.string(),
          Ap_paterno: schema.string(),
          Ap_materno: schema.string(),
          Edad: schema.number(),
          Correo: schema.string(),
          Numero: schema.number()
        });
      
        try {
          await request.validate({
            schema: validationSchema,
          });
        } catch (error) {
          return response.badRequest(error.messages);
        }
      
       
      
        const empleado = await Empleado.find(id);
      
        if (empleado) {
          empleado.merge(request.only(['Nombre', 'Ap_paterno', 'Ap_materno', 'Edad', 'Correo', 'Numero']));
          await empleado.save();
      
          return response.status(204).json({
            Status: 204,
            Msg: "Los datos se cambiaron de forma exitosa",
            Data: empleado,
          });
        }
      
        return response.status(400).json({
          Status: 400,
          Msg: "Empleado no encontrado",
        });
      }
      

      public async CambiarProvedor({ request, response }: HttpContextContract,  Tok: string = "") {
        const id = request.param('id');

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
      
       
      
        const provedor = await Provedor.find(id);
      
        if (provedor) {
          provedor.Nombre = request.input("Nombre");
          provedor.Direccion = request.input("Direccion");
          provedor.Telefono = request.input("Telefono");
      
          await provedor.save();
      
          return response.status(204).json({
            Status: 204,
            Msg: "Los datos se cambiaron de forma exitosa",
            Data: provedor,
          });
        }
      
        return response.status(400).json({
          Status: 400,
          Msg: "Provedor no encontrado",
        });
      }






      public async CambiarUsuario({ request, response }: HttpContextContract) {
        const id = request.param('id');
    
        const validationSchema = schema.create({
          name: schema.string(),
          email: schema.string(),
          phone: schema.number(),
          rol_id: schema.number(),
          active: schema.number(),
        });
    
        try {
          await request.validate({
            schema: validationSchema,
          });
        } catch (error) {
          return response.badRequest(error.messages);
        }
    
        const usuario = await User.find(id);
    
        if (usuario) {
          usuario.name = request.input('name');
          usuario.email = request.input('email');
          usuario.phone = request.input('phone');
          usuario.rol_id = request.input('rol_id');
          usuario.active = request.input('active');
    
          await usuario.save();
    
          return response.status(204).json({
            Status: 204,
            Msg: 'Los datos se cambiaron de forma exitosa',
            Data: usuario,
          });
        }
    
        return response.status(400).json({
          Status: 400,
          Msg: 'usuario no encontrado',
        });
      }


      public async editEmpleado({ params, response }: HttpContextContract) {
        const empleado = await Database.from('empleados').where('id', params.id).first()
        if (!empleado) {
          return response.status(404).json({
            Status: 404,
            Msg: "Empleado no encontrado",
          })
        }
        return empleado
      }
    
      public async editProvedor ({ params, response }: HttpContextContract){
        const provedor = await Database.from('provedores').where('id', params.id).first()
        if (!provedor) {
          return response.status(404).json({
            Status: 404,
            Msg: "Provedor no encontrado",
          })
        }
        return provedor
      }
    
      public async editCliente ({ params,response }: HttpContextContract) {
        const cliente = await Database.from('clientes').where('id', params.id).first()
        if (!cliente) {
          return response.status(404).json({
            Status: 404,
            Msg: "Cliente no encontrado",
          })
        }
        return cliente
      }
    
      public async editProducto ({ params, response }: HttpContextContract){
        const producto = await Database.from('productos').where('id', params.id).first()
        if (!producto) {
            return response.status(404).json({
                Status: 404,
                Msg: "Producto no encontrado",
            })
            }
            return producto
      }

      public async editUsuario ({ params, response }: HttpContextContract){
        const producto = await Database.from('users').where('id', params.id).first()
        if (!producto) {
            return response.status(404).json({
                Status: 404,
                Msg: "usuario no encontrado",
            })
            }
            return producto
      }
      
      


}
