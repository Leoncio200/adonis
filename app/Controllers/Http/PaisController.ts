import Pais from 'App/Models/Pais';

export default class PaisController {
    async SeleccionarPais({ response }) {
      const paises = await Pais.all()
      return response.json(paises)
    }
  }