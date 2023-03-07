import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'productos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('Nombre', 25)
      table.integer('Stock').unsigned()
      table.float('Precio').unsigned()
      table.integer('Marca').unsigned().references('id').inTable('provedores')

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
