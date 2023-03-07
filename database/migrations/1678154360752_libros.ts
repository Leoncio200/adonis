import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'libros'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nombre', 60)
      table.string('año_de_publicacion')
      table.string('numero_de_paginas')
      table.foreign('fk_editorial').references('editoriales.id')
      table.foreign('fk_autor').references('autores.id')
      table.foreign('fk_pais').references('paises.id')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
      table.boolean('status')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
