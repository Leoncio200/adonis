import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'libros'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nombre', 60)
      table.string('fecha_de_publicacion')
      table.string('numero_de_paginas')
      table.integer('fk_editorial').unsigned().references('id').inTable('editoriales')
      table.integer('fk_autor').unsigned().references('id').inTable('autores')
      table.integer('fk_pais').unsigned().references('id').inTable('paises')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true }).nullable()
      table.boolean('status')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
