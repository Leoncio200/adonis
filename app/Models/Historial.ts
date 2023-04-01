import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Historial extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public victorias: number

  @column()
  public derrotas: number

  @column()
  public id_user: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
