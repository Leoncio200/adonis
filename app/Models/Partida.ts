import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Partida extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public ventana1: string

  @column()
  public ventana2: string

  @column()
  public Status: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  public static table = 'partidas'
}


