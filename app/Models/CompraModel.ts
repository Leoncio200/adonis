import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'


export default class Compra extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public Cliente: number

  @column()
  public Producto: number

  @column()
  public Cantidad: number

  @column()
  public MontoTotal: number

  @column()
  public Empleado: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /**
   * The table associated with the model.
   *
   * @var string
   */
  public static table = 'compras'
}
