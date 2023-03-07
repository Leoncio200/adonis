import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'compras'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('Cliente').unsigned().references('id').inTable('clientes')
      table.integer('Producto').unsigned().references('id').inTable('productos')
      table.integer('Cantidad').unsigned()
      table.float('MontoTotal').unsigned()
      table.integer('Empleado').unsigned().references('id').inTable('empleados')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
