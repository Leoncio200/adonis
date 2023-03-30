import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class UserPartida extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_partida: number

  @column()
  public nombre: string

  @column()
  public turno: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
