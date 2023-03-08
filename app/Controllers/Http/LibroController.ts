import Pais from 'App/Models/Pais';
import Editorial from 'App/Models/Editorial';
import Autor from 'App/Models/Autor';
import Database from '@ioc:Adonis/Lucid/Database';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import fetch from 'node-fetch';
import { schema } from '@ioc:Adonis/Core/Validator';
import Validator from 'Validator';

export default class PaisController {
    async mostrarPaises({ response }) {
      const paises = await Pais.all()
      return response.json(paises)
    }

    async mostrarEditoriales({ response }) {
        const editoriales = await Editorial.all()
        return response.json(editoriales)
      }

      async mostrarAutores({ response }) {
        const autores = await Autor.all()
        return response.json(autores)
      }

      public async mostrarLibros({ response }: HttpContextContract) {
        const infoLibros = await Database
        .query()
        .select('libros.id', 'libros.status', 'libros.nombre', 'libros.fecha_de_publicacion', 'libros.numero_de_paginas', 'editoriales.nombre AS fk_editorial', 'autores.nombre AS fk_autor', 'paises.nombre AS fk_pais')
        .from('libros')
        .join('editoriales', 'libros.fk_editorial', '=', 'editoriales.id')
        .join('autores', 'libros.fk_autor', '=', 'autores.id')
        .join('paises', 'libros.fk_pais', '=', 'paises.id');
      
      return infoLibros;
      }

      public async insertarPaises({ request, response }: HttpContextContract, Tok: string = '') {
        const validationSchema = schema.create({
            nombre: schema.string(),
          })
          
          try {
            await request.validate({
              schema: validationSchema,
            })
          } catch (error) {
            return response.badRequest(error.messages)
          }
          if (request.ip() == '192.168.43.126') {
            const response = await fetch('http://192.168.43.230:1030/api/search/pais', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Tok}`,
              },
              body: JSON.stringify({
                nombre: request.input('nombre'),
              }),
            })
            if (!response.ok) {
              return response.notFound(response.statusText)
            }
          }
          
          await Database.table('paises').insert({
            nombre: request.input('nombre'),
            status: 1,
          })
          
          const pais = await Pais.findBy('nombre', request.input('nombre'))
          
          return response.created({
            Status: 201,
            Msg: 'Los datos se insertaron de forma exitosa',
            Data: pais,
          })
        }    
        
        
        public async insertarAutores({ request, response }: HttpContextContract, Tok: string = '') {
            const validationSchema = schema.create({
              nombre: schema.string(),
            })
        
            try {
              await request.validate({
                schema: validationSchema,
              })
            } catch (error) {
              return response.badRequest(error.messages)
            }
        
            if (request.ip() == '192.168.43.126') {
              const fetchResponse = await fetch('http://192.168.43.230:1030/api/search/autores', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${Tok}`,
                },
                body: JSON.stringify({
                  nombre: request.input('nombre'),
                }),
              })
              if (!fetchResponse.ok) {
                return response.notFound(fetchResponse.statusText)
              }
            }
        
            const autor = new Autor()
            autor.nombre = request.input('nombre')
            autor.status = 1
            await autor.save()
        
            return response.created({
              Status: 201,
              Msg: 'Los datos se insertaron de forma exitosa',
              Data: autor,
            })
          }


          public async insertarEditoriales({ request, response }: HttpContextContract, Tok: string = '') {
            const validationSchema = schema.create({
              nombre: schema.string(),
            })
          
            try {
              await request.validate({
                schema: validationSchema,
              })
            } catch (error) {
              return response.badRequest(error.messages)
            }
          
            if (request.ip() == '192.168.43.126') {
              const response = await fetch('http://192.168.43.230:1030/api/search/editoriales', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${Tok}`,
                },
                body: JSON.stringify({
                  nombre: request.input('nombre'),
                }),
              })
          
              if (!response.ok) {
                return response.notFound(response.statusText)
              }
            }
          
            const editorial = await Editorial.create({
              nombre: request.input('nombre'),
              status: 1,
            })
          
            return response.created({
              Status: 201,
              Msg: 'Los datos se insertaron de forma exitosa',
              Data: editorial,
            })
          }


          public async insertarLibros({ request, response }: HttpContextContract, Tok: string = '') {
            const validationSchema = schema.create({
              nombre: schema.string(),
              fecha_de_publicacion: schema.string(),
              numero_de_paginas: schema.number(),
              fk_editorial: schema.number.optional(),
              fk_autor: schema.number.optional(),
              fk_pais: schema.number.optional(),
            })
        
            try {
              await request.validate({
                schema: validationSchema,
              })
            } catch (error) {
              return response.badRequest(error.messages)
            }
        
            if (request.ip() === '192.168.43.126') {
              const fetchResponse = await fetch('http://192.168.43.230:1030/api/search/libros', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${Tok}`,
                },
                body: JSON.stringify({
                  nombre: request.input('nombre'),
                  fecha_de_publicacion: request.input('fecha_de_publicacion'),
                  numero_de_paginas: request.input('numero_de_paginas'),
                  fk_editorial: request.input('fk_editorial'),
                  fk_autor: request.input('fk_autor'),
                  fk_pais: request.input('fk_pais'),
                }),
              })
        
              if (!fetchResponse.ok) {
                return response.status(fetchResponse.status).send({ Msg: 'Algo ha ocurrido' })
              }
            }
        
            const libro = await Database.table('libros').insert({
              nombre: request.input('nombre'),
              fecha_de_publicacion: request.input('fecha_de_publicacion'),
              numero_de_paginas: request.input('numero_de_paginas'),
              fk_editorial: request.input('fk_editorial'),
              fk_autor: request.input('fk_autor'),
              fk_pais: request.input('fk_pais'),
              status: 1,
            })
        
            const insertedLibro = await Database.from('libros').where('id', libro[0]).first()
        
            return response.created({
              Status: 201,
              Msg: 'Los datos se insertaron de forma exitosa',
              Data: insertedLibro,
            })
          }
  }