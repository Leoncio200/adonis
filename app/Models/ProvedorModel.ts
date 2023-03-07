import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'
import { DateTime } from 'luxon'


export default class Proveedor extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public Nombre: string

  @column()
  public Direccion: string

  @column()
  public Telefono: string

  @column()
  public Status: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  /**
   * The table associated with the model.
   *
   * @var string
   */
  public static table = 'provedores'
}
