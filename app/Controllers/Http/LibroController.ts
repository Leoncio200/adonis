import Pais from 'App/Models/Pais';
import Editorial from 'App/Models/Editorial';
import Autor from 'App/Models/Autor';
import Database from '@ioc:Adonis/Lucid/Database';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

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

      public async insertarPaises(){
        
      }
  }