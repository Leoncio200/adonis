import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Ataque extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public X: string

  @column()
  public Y: number

  @column()
  public id_user: number

  @column()
  public id_enfrentamiento: number


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
