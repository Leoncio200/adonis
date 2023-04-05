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
          stream.push(`data: ${msj} emit!\n\n`)
          response.response.write(stream.read())
        })
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

    public async deleteSalon({ params, response }: HttpContextContract) {
      const { id } = params;
    
      await this.client.connect();
      const db = this.client.db(this.dbName);
      const collection = db.collection('Salones');
    
      const deleteResult = await collection.deleteOne({ _id: new ObjectId(id) });
    
      if (deleteResult.deletedCount === 0) {
        return response.status(404).json({ message: 'Salon no encontrado.' });
      }
    
      return response.status(200).json({ message: 'Salon eliminado correctamente.' });
    }

    public async obtenerSalon({ params, response }: HttpContextContract) {
      const { id } = params;
    
      await this.client.connect();
      const db = this.client.db(this.dbName);
      const collection = db.collection('Salones');
    
      const sensor = await collection.findOne({ _id: new ObjectId(id) });
    
      if (!sensor) {
        return response.status(404).json({ message: 'Salon no encontrado.' });
      }
    
      return response.status(200).json(sensor);
    }

    public async actualizarSalon({ request, response }: HttpContextContract){
      const { id } = request.params();
      const sensor = request.all();
    
      await this.client.connect();
      const db = this.client.db(this.dbName);
      const collection = db.collection('Salones');
    
      const updateResult = await collection.updateOne({ _id: new ObjectId(id) }, { $set: sensor });
    
      if (updateResult.matchedCount === 0) {
        return response.status(404).json({ message: 'Salon no encontrado.' });
      }
    
      return response.status(200).json({ message: 'Salon actualizado correctamente.' });
    }


}