import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'empleados'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('Nombre',30)
      table.string('Ap_paterno',15)
      table.string('Ap_materno',15)
      table.tinyint('Edad').unsigned()
      table.string('Correo',65)
      table.string('Numero',10)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true }).nullable()
      table.boolean('Status')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
