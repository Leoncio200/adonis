// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'


export default class PaisController {
    public async SeleccionarPais(){
        const axios = use('axios')
        const response = await axios.get('https://restcountries.eu/rest/v2/all')   
        return response.data
    }
}
