
import Cliente from 'App/Models/Cliente'
import Provedor from 'App/Models/Provedor'
import Empleado from 'App/Models/Empleado'
import User from 'App/Models/User'
import Alumno from 'App/Models/Alumno';

export default class BorrarController {
    async borrarCliente({ request, response },  Tok = '') {
        const id = request.param('id');
       
              const cliente = await Cliente.find(id)
              if (cliente) {
                cliente.Status = 0
                await cliente.save()
                return response.status(204).json({ Status: 204 })
              }
          
    
        return response.status(400).json({ Status: 400, Msg: 'Cliente no encontrado' })
      }

      async borrarProvedor({ request, response },  Tok = '') {
        const id = request.param('id');
       
              const provedor = await Provedor.find(id)
              if (provedor) {
                provedor.Status = 0
                await provedor.save()
                return response.status(204).json({ Status: 204 })
              }
          
    
        return response.status(400).json({ Status: 400, Msg: 'Provedor no encontrado' })
      }

      async borrarEmpleado({ request, response },  Tok = '') {
        const id = request.param('id');
       
              const empleado = await Empleado.find(id)
              if (empleado) {
                empleado.Status = 0
                await empleado.save()
                return response.status(204).json({ Status: 204 })
              }
          
    
        return response.status(400).json({ Status: 400, Msg: 'empleado no encontrado' })
      }

      async borrarUsuario({ request, response },  Tok = '') {
        const id = request.param('id');
       
              const user = await User.find(id)
              if (user) {
                user.active = 0
                await user.save()
                return response.status(204).json({ Status: 204 })
              }
          
    
        return response.status(400).json({ Status: 400, Msg: 'usuario no encontrado' })
      }

     
      async borrarAlumno({ request, response },  Tok = '') {
        const id = request.param('id');
       
        const user = await Alumno.find(id)
        if (user) {
          user.Status = 0
          await user.save()
          return response.status(204).json({ Status: 204 })
        }
    

  return response.status(400).json({ Status: 400, Msg: 'usuario no encontrado' })
}


        
}
