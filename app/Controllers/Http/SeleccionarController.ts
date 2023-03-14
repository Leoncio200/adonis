import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';
import Cliente from "App/Models/Cliente";
import Provedor from "App/Models/Provedor";
import Empleado from "App/Models/Empleado";
import Producto from "App/Models/Producto";
import Compra from 'App/Models/Compra';
import Rol from 'App/Models/Rol';
import Alumno from 'App/Models/Alumno';

export default class SeleccionarController {
    public async SeleccionarCliente({ params, response }: HttpContextContract) {
        const id = params.id || 0;
        if (id === 0) {
          const clientes = await Database
            .query()
            .select('clientes.*')
            .from('clientes')
            .where('Status', 1);
          return response.status(200).json({
            Status: 200,
            Data: clientes
          });
        }
        const cliente = await Cliente.find(id);
        if (cliente) {
          cliente.Status = 1;
          await cliente.save();
          return response.status(200).json({
            Status: 200,
            Data: cliente
          });
        }
        return response.status(404).json({
          Status: 404,
          Msg: 'Cliente no encontrado'
        });
      }

      public async SeleccionarProvedor({ params, response }: HttpContextContract) {
        const id = params.id || 0;
        if (id === 0) {
          const provedores = await Database
            .query()
            .select('provedores.*')
            .from('provedores')
            .where('Status', 1);
          return response.status(200).json({
            Status: 200,
            Data: provedores
          });
        }
        const provedor = await Provedor.find(id);
        if (provedor) {
          provedor.Status = 1;
          await provedor.save();
          return response.status(200).json({
            Status: 200,
            Data: provedor
          });
        }
        return response.status(404).json({
          Status: 404,
          Msg: 'Proveedor no encontrado'
        });
      }

      public async SeleccionarEmpleado({ params, response }: HttpContextContract) {
        const id = params.id || 0;
        if (id === 0) {
          const empleados = await Database
            .query()
            .select('empleados.*')
            .from('empleados')
            .where('Status', 1);
          return response.status(200).json({
            Status: 200,
            Data: empleados
          });
        }
        const empleado = await Empleado.find(id);
        if (empleado) {
          empleado.Status = 1;
          await empleado.save();
          return response.status(200).json({
            Status: 200,
            Data: empleado
          });
        }
        return response.status(404).json({
          Status: 404,
          Msg: 'Empleado no encontrado'
        });
      }

      public async SeleccionarProducto({ params, response }) {
        const id = params.id || 0;
        if (id === 0) {
          const productos = await Database
            .query()
            .select('productos.id', 'productos.Nombre', 'productos.Stock', 'productos.Precio', 'provedores.Nombre as Marca')
            .from('productos')
            .join('provedores', 'provedores.id', '=', 'productos.Marca')
            .where('productos.Status', 1);
          return response.status(200).json({
            Status: 200,
            Data: productos
          });
        }
        const producto = await Producto.find(id);
        if (producto) {
          return response.status(200).json({
            Status: 200,
            Data: producto
          });
        }
        return response.status(404).json({
          Status: 404,
          Msg: 'Producto no encontrado'
        });
      }

      public async SeleccionarCompra({ params, response }: HttpContextContract) {
        const id = params.id || 0;
        if (id === 0) {
          const compras = await Database
            .query()
            .select('clientes.Nombre as Cliente', 'productos.Nombre as Producto', 'compras.Cantidad', 'compras.MontoTotal', 'empleados.Nombre as Empleado')
            .from('compras')
            .join('clientes', 'compras.Cliente', '=', 'clientes.id')
            .join('productos', 'compras.Producto', '=', 'productos.id')
            .join('empleados', 'compras.Empleado', '=', 'empleados.id')
            .where('compras.Status', 1);
          return response.status(200).json({
            Status: 200,
            Data: compras
          });
        }
        const compra = await Compra
          .query()
          .select('compras.id', 'clientes.Nombre as Cliente', 'productos.Nombre as Producto', 'compras.Cantidad', 'compras.MontoTotal', 'empleados.Nombre as Empleado')
          .from('compras')
          .join('clientes', 'compras.Cliente', '=', 'clientes.id')
          .join('productos', 'compras.Producto', '=', 'productos.id')
          .join('empleados', 'compras.Empleado', '=', 'empleados.id')
          .where('compras.id', '=', id)
          .andWhere('compras.Status', '=', 0)
          .first();
        if (compra) {
          compra.Status = 1;
          await compra.save();
          return response.status(200).json({
            Status: 200,
            Data: compra
          });
        }
        return response.status(404).json({
          Status: 404,
          Msg: 'Compra no encontrada'
        });
      }
      

      public async SeleccionarUsuarios({ params, response }) {
        const id = params.id || 0;
        if (id === 0) {
          const usuarios = await Database
            .from('users')
            .join('roles', 'roles.id', '=', 'users.rol_id')
            .select('users.id', 'users.name', 'users.email', 'users.phone', 'roles.nombre as rol_id', 'users.active');
          return response.status(200).json({
            "Status": 200,
            "Data": usuarios
          });
        }
        const usuario = await Database
          .from('users')
          .join('roles', 'roles.id', '=', 'users.rol_id')
          .select('users.id', 'users.name', 'users.email', 'users.phone', 'roles.nombre as rol', 'users.active')
          .where('users.id', id)
          .first();
        if (usuario) {
          return response.status(200).json({
            "Status": 200,
            "Data": usuario
          });
        }
        return response.status(404).json({
          "Status": 404,
          "Msg": "usuario no encontrado"
        });
      }


      async SeleccionarRoles ({ response }) {
        const roles = await Rol.all()
      
        return response.status(200).json({
          Status: 200,
          Data: roles
        })
      }

      async mostrarAlumnos({ response }) {
        const paises = await Alumno.all()
        return response.json(paises)
      }
      
      
      
}
