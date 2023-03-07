// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class PaisController {
    public async SeleccionarPais(){
        const Database = use('Database')

        const results = await Database.table('users').select('*')

        

    }
}
