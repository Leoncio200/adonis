import Pais from 'App/Models/Pais';
import Editorial from 'App/Models/Editorial';
import Autor from 'App/Models/Autor';
import Libro from 'App/Models/Libro';
import Database from '@ioc:Adonis/Lucid/Database';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import fetch from 'node-fetch';
import { schema } from '@ioc:Adonis/Core/Validator';
'use strict'

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
        try {
          const autores = await Autor.all()
          return response.json(autores)
        } catch (error) {
          response.status(400).send('Error al obtener los autores')
        }
      }

      public async mostrarLibros({ }: HttpContextContract) {
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

          public async actualizarEditorial({ request, response }: HttpContextContract, Tok: string = '') {
            const id = request.param('id')
        
            const validationSchema = schema.create({
              nombre: schema.string.optional(),
            });
        
            try {
              await request.validate({
                schema: validationSchema,
              });
            } catch (error) {
              return response.badRequest(error.messages);
            }
        
            if (request.ip() === '192.168.43.126') {
              const fetchResponse = await fetch(`http://192.168.43.230:1030/api/search/editoriales/${id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${Tok}`,
                },
                body: JSON.stringify({
                  nombre: request.input('nombre'),
                }),
              });
        
              if (!fetchResponse.ok) {
                return response.status(fetchResponse.status).send({ Msg: 'Algo ha ocurrido' });
              }
            }
        
            const editorial = await Editorial.find(id);
            if (editorial) {
              editorial.nombre = request.input('nombre') || editorial.nombre;
        
              await editorial.save();
        
              return response.status(204).json({
                Status: 204,
                Msg: 'Los datos se cambiaron de forma exitosa',
                Data: editorial,
              });
            }
        
            return response.status(400).json({
              Status: 400,
              Msg: 'Empleado no encontrado',
            });
          }

          public async actualizarAutor({ request, response }: HttpContextContract, Tok: string = '') {
            const id = request.param('id');
        
            const validationSchema = schema.create({
              nombre: schema.string.optional(),
            });
        
            try {
              await request.validate({
                schema: validationSchema,
              });
            } catch (error) {
              return response.badRequest(error.messages);
            }
        
            if (request.ip() === '192.168.43.126') {
              const fetchResponse = await fetch(`http://192.168.43.230:1030/api/search/autor/${id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${Tok}`,
                },
                body: JSON.stringify({
                  nombre: request.input('nombre'),
                }),
              });
        
              if (!fetchResponse.ok) {
                return response.status(fetchResponse.status).send({ Msg: 'Algo ha ocurrido' });
              }
            }
        
            const autor = await Autor.find(id);
            if (autor) {
              autor.nombre = request.input('nombre') || autor.nombre;
        
              await autor.save();
        
              return response.status(204).json({
                Status: 204,
                Msg: 'Los datos se cambiaron de forma exitosa',
                Data: autor,
              });
            }
        
            return response.status(400).json({
              Status: 400,
              Msg: 'Empleado no encontrado',
            });
          }

          public async actualizarPais({ request, response }: HttpContextContract, Tok: string = '') {
            const id = request.param('id');
          
            const validationSchema = schema.create({
              nombre: schema.string.optional(),
            });
          
            try {
              await request.validate({
                schema: validationSchema,
              });
            } catch (error) {
              return response.badRequest(error.messages);
            }
          
            if (request.ip() === '192.168.43.126') {
              const fetchResponse = await fetch(`http://192.168.43.230:1030/api/search/pais/${id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${Tok}`,
                },
                body: JSON.stringify({
                  nombre: request.input('nombre'),
                }),
              });
          
              if (!fetchResponse.ok) {
                return response.status(fetchResponse.status).send({ Msg: 'Algo ha ocurrido' });
              }
            }
          
            const pais = await Pais.find(id);
            if (pais) {
              pais.nombre = request.input('nombre') || pais.nombre;
          
              await pais.save();
          
              return response.status(204).json({
                Status: 204,
                Msg: 'Los datos se cambiaron de forma exitosa',
                Data: pais,
              });
            }
          
            return response.status(400).json({
              Status: 400,
              Msg: 'Empleado no encontrado',
            });
          }
          

          public async actualizarLibro({ request, response }: HttpContextContract, Tok: string = '') {
            const id = request.param('id')
          
            const validationSchema = schema.create({
              nombre: schema.string.optional(),
              fecha_de_publicacion: schema.date.optional(),
              numero_de_paginas: schema.number.optional(),
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
              const fetchResponse = await fetch(`http://192.168.43.230:1030/api/search/libro/${id}`, {
                method: 'PUT',
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
          
            const libro = await Libro.find(id)
            if (libro) {
              libro.nombre = request.input('nombre') || libro.nombre
              libro.fecha_de_publicacion = request.input('fecha_de_publicacion') || libro.fecha_de_publicacion
              libro.numero_de_paginas = request.input('numero_de_paginas') || libro.numero_de_paginas
              libro.fk_editorial = request.input('fk_editorial') || libro.fk_editorial
              libro.fk_autor = request.input('fk_autor') || libro.fk_autor
              libro.fk_pais = request.input('fk_pais') || libro.fk_pais
          
              await libro.save()
          
              return response.status(204).json({
                Status: 204,
                Msg: 'Los datos se cambiaron de forma exitosa',
                Data: libro,
              })
            }
          
            return response.status(400).json({
              Status: 400,
              Msg: 'Libro no encontrado',
            })
          }
          
          public async editEditorial({ params }) {
            const editorial = await Editorial.findOrFail(params.id);
            return editorial;
          }

          public async editAutor({ params }: HttpContextContract) {
            const autor = await Autor.findOrFail(params.id)
            return autor
          }

            public async editPais({ params }: HttpContextContract) {
            const pais = await Pais.findOrFail(params.id)
            return pais
            }

            public async editLibro({ params }: HttpContextContract) {
            const libro = await Libro.findOrFail(params.id)
            return libro
            }







            public async eliminarEditorial({ request, response, params }: HttpContextContract, Tok: string = '') {
                const { editorial } = params;
                console.log("editorial: ", editorial);
              
                if (request.ip() === '192.168.43.126') {
              
                  const fetchResponse = await fetch(`http://192.168.43.230:1030/api/search/editoriales/${editorial}`, {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${Tok}`,
                    },
                  });
                
                  if (!fetchResponse.ok) {
                    return response.status(fetchResponse.status).send({ Msg: 'Algo ha ocurrido' });
                  }
                }
                
                const editorialModel = await Editorial.find(editorial);
                
                if (editorialModel) {
                  editorialModel.status = 0;
                  await editorialModel.save();
                
                  return response.status(204).json({
                    Status: 204,
                    Msg: 'Los datos se cambiaron de forma exitosa',
                    Data: editorialModel,
                  });
                }
                
                return response.status(400).json({
                  Status: 400,
                  Msg: 'Editorial no encontrada',
                });
              }


              public async eliminarAutor({ request, response, params }: HttpContextContract, Tok: string = '') {
                const { autor } = params
                console.log('autor:', autor)
            
                if (request.ip() === '192.168.43.126') {
                  const fetchResponse = await fetch(`http://192.168.43.230:1030/api/search/autor/${autor}`, {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${Tok}`,
                    },
                  })
            
                  if (!fetchResponse.ok) {
                    return response.status(fetchResponse.status).send({ Msg: 'Algo ha ocurrido' })
                  }
                }
            
                const autorModel = await Autor.find(autor)
            
                if (autorModel) {
                  autorModel.status = 0
                  await autorModel.save()
            
                  return response.status(204).json({
                    Status: 204,
                    Msg: 'Los datos se cambiaron de forma exitosa',
                    Data: autorModel,
                  })
                }
            
                return response.status(400).json({
                  Status: 400,
                  Msg: 'Autor no encontrado',
                })
              }

              public async eliminarPais({ request, response, params }: HttpContextContract, Tok: string = '') {
                const { pais } = params
            
                if (request.ip() === '192.168.43.126') {
                  const fetchResponse = await fetch(`http://192.168.43.230:1030/api/search/pais/${pais}`, {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${Tok}`,
                    },
                  })
            
                  if (!fetchResponse.ok) {
                    return response.status(fetchResponse.status).send({ Msg: 'Algo ha ocurrido' })
                  }
                }
            
                const paisModel = await Pais.find(pais)
            
                if (paisModel) {
                  paisModel.status = 0
                  await paisModel.save()
            
                  return response.status(204).json({
                    Status: 204,
                    Msg: 'Los datos se cambiaron de forma exitosa',
                    Data: paisModel,
                  })
                }
            
                return response.status(400).json({
                  Status: 400,
                  Msg: 'País no encontrado',
                })
              }

              public async eliminarLibro({ request, response, params }: HttpContextContract, Tok: string = '') {
                const { libro } = params;
                console.log("libro: ", libro);
              
                if (request.ip() === '192.168.43.126') {
              
                  const fetchResponse = await fetch(`http://192.168.43.230:1030/api/search/libro/${libro}`, {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${Tok}`,
                    },
                  });
              
                  if (!fetchResponse.ok) {
                    return response.status(fetchResponse.status).send({ Msg: 'Algo ha ocurrido' });
                  }
                }
              
                const libroModel = await Libro.find(libro);
              
                if (libroModel) {
                  libroModel.status = 0;
                  await libroModel.save();
              
                  return response.status(204).json({
                    Status: 204,
                    Msg: 'Los datos se cambiaron de forma exitosa',
                    Data: libroModel,
                  });
                }
              
                return response.status(400).json({
                  Status: 400,
                  Msg: 'Libro no encontrado',
                });
              }
        



          

          



  }