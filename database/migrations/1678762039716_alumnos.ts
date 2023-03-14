import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Alumnos extends BaseSchema {
  protected tableName = 'alumnos'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nombre')
      table.integer('edad')
      table.string('telefono')
      table.integer('Status')
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
