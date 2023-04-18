import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Database from '@ioc:Adonis/Lucid/Database';
import Cliente from "App/Models/Cliente";
import Provedor from "App/Models/Provedor";
import Empleado from "App/Models/Empleado";
import Producto from "App/Models/Producto";
import Compra from 'App/Models/Compra';
import Rol from 'App/Models/Rol';
import Alumno from 'App/Models/Alumno';
import Event from '@ioc:Adonis/Core/Event';
import { Readable } from 'stream';
import Partida from 'App/Models/Partida';
import UserPartida from 'App/Models/UserPartida';
import { MongoClient } from 'mongodb';
import { ObjectId } from 'mongodb';


export default class SeleccionarController {
  url = 'mongodb+srv://Leoncio:Leoncio2@cluster0.kk3lull.mongodb.net/?retryWrites=true&w=majority';
  client = new MongoClient(this.url);
  dbName = 'Sensores';
  
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

      public async mostrarAlumnos({}: HttpContextContract) {
        const alumnos = await Database
        .query()
          .select('*')
          .from('alumnos');
        
        return alumnos;
      }
      
      public async serverSentStream({ response }) {
        response.response.setHeader('content-type','text/event-stream')
        response.response.setHeader('Access-Control-Allow-Origin','*')
        response.response.setHeader("Cache-Control","no-cache")
        response.response.setHeader( "Connection", "keep-alive")
        const stream = new Readable({read(){}})
        response.response.write(':open\n\n')

           // Agregamos datos al objeto Readable y enviamos el evento SSE
        stream.push('data: hay cambios\n\n')
        response.response.write(stream.read())

        Event.on('message',(msj)=>{
          stream.push(`data: ${JSON.stringify(msj)}\n\n`)
          response.response.write(stream.read())
        })
          
      }

      public async SeleccionarPartida({ params, response }: HttpContextContract) {
        const id = params.id || 0;
        if (id === 0) {
          const partidas = await Database
            .query()
            .select('partidas.*')
            .from('partidas')
            .where('Status', 1);
          return response.status(200).json({
            Status: 200,
            Data: partidas
          });
        }
        const partida = await Partida.find(id);
        if (partida) {
          partida.Status = 1;
          await partida.save();
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

      public async cambiarJugador({params, response}: HttpContextContract){
        const inicio = params.inicio || true;
        const id_partida = params.id_partida || 0;
        const turno = params.turno || 0;
        if(inicio === true){
          const jugador = await Database
            .query()
            .select('usersPartida.*')
            .from('usersPartida')
            .where('id_partida', id_partida)
            .where('turno', 1);
            
            Event.emit('message', `turno del siguiente jugador`)
            
            return response.status(200).json({
              Status: 200,
              Data: jugador
            });
          }
        else {
          const jugador = await Database
            .query()
            .select('usersPartida.*')
            .from('usersPartida')
            .where('id_partida', id_partida)
            .where('turno', turno);
            
            Event.emit('message', `turno del siguiente jugador`)
            
            return response.status(200).json({
            Status: 200,
            Data: jugador
          });
          }
      }

      public async sensores ({ request, response }: HttpContextContract){
        await this.client.connect();
        const db = this.client.db(this.dbName);
        const collection = db.collection('SensoresInformacion');

        const findResult = await collection.find({}).toArray();
        // the following code examples can be pasted here...

        return findResult;
      }

      public async tipoSensor ({ request, response }: HttpContextContract){
        await this.client.connect();
        const db = this.client.db(this.dbName);
        const collection = db.collection('SensoresInformacion');

        const findResult = await collection.find({ tipo: "temperatura" }).toArray();
        // the following code examples can be pasted here...

        return findResult;
      }

      public async actualizarUbicacion({ request, response }: HttpContextContract){
        const { id } = request.params();
        const { ubicacion } = request.all();
    
        await this.client.connect();
        const db = this.client.db(this.dbName);
        const collection = db.collection('SensoresInformacion');
    
        const updateResult = await collection.updateOne({ _id: id }, { $set: { ubicacion: ubicacion } });
    
        if (updateResult.matchedCount === 0) {
            return response.status(404).json({ message: 'Sensor no encontrado.' });
        }
    
        return response.status(200).json({ message: 'Sensor actualizado correctamente.' });
    }

    public async obtenerDescripcion({ request, response }: HttpContextContract){
      const { id } = request.params();

      await this.client.connect();
      const db = this.client.db(this.dbName);
      const collection = db.collection('SensoresInformacion');

      const findResult = await collection.findOne({ _id: id }, { projection: { descripcion: 1 } });

      if (!findResult) {
          return response.status(404).json({ message: 'Sensor no encontrado.' });
      }

      return response.status(200).json(findResult);
  }

  public async addSensor({ request, response, auth }: HttpContextContract){
    const sensor = request.all();

    await this.client.connect();
    const db = this.client.db(this.dbName);
    const collection = db.collection('SensoresInformacion');

    const insertResult = await collection.insertOne(sensor);

    return response.status(201).json(insertResult.ops);
}

public async deleteSensor({ params, response }: HttpContextContract) {
  const { id } = params;

  await this.client.connect();
  const db = this.client.db(this.dbName);
  const collection = db.collection('SensoresInformacion');

  const deleteResult = await collection.deleteOne({ _id: new ObjectId(id) });

  if (deleteResult.deletedCount === 0) {
    return response.status(404).json({ message: 'Sensor no encontrado.' });
  }

  return response.status(200).json({ message: 'Sensor eliminado correctamente.' });
}

public async obtenerSensor({ params, response }: HttpContextContract) {
  const { id } = params;

  await this.client.connect();
  const db = this.client.db(this.dbName);
  const collection = db.collection('SensoresInformacion');

  const sensor = await collection.findOne({ _id: new ObjectId(id) });

  if (!sensor) {
    return response.status(404).json({ message: 'Sensor no encontrado.' });
  }

  return response.status(200).json(sensor);
}

public async actualizarSensor({ request, response }: HttpContextContract){
  const { id } = request.params();
  const sensor = request.all();

  await this.client.connect();
  const db = this.client.db(this.dbName);
  const collection = db.collection('SensoresInformacion');

  const updateResult = await collection.updateOne({ _id: new ObjectId(id) }, { $set: sensor });

  if (updateResult.matchedCount === 0) {
    return response.status(404).json({ message: 'Sensor no encontrado.' });
  }

  return response.status(200).json({ message: 'Sensor actualizado correctamente.' });
}




public async obtenerDatos({ params, response }: HttpContextContract){
  const url = 'mongodb+srv://Leoncio:Leoncio2@cluster0.kk3lull.mongodb.net/?retryWrites=true&w=majority';
  const client = new MongoClient(url);
  const dbName = 'Sensores';

  await client.connect();
  const db = client.db(dbName);
  const collection = db.collection('sensoresDatos');

  const id = params.id;
  const sensor = await collection.findOne({ "sensor._id": id });

  if(!sensor){
      return response.status(404).json({ message: 'Sensor no encontrado' });
  }

  return response.json(sensor);
}


public async obtenerSalones ({ request, response }: HttpContextContract){
  await this.client.connect();
  const db = this.client.db(this.dbName);
  const collection = db.collection('Salones');

  const findResult = await collection.find({}).toArray();
  // the following code examples can be pasted here...

  return findResult;
}
    public async addSalon ({ request, response, auth }: HttpContextContract){
      request.body().user = auth.user;
      const sensor = request.body();
    
      await this.client.connect();
      const db = this.client.db(this.dbName);
      const collection = db.collection('Salones');
      
      const insertResult = await collection.insertOne(sensor);
      console.log(sensor)
    }


}