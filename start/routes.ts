/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import { RouteResource } from '@adonisjs/http-server/build/src/Router/Resource';
import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route.get('/api/user', ({ auth }) => {
  return auth.user;
}).middleware(['auth']);

Route.get('/prueba2', 'LoginController.prueba')



Route.put('/Validacion', 'LoginController.Validacion').as('validacion')
Route.post('/api/user', 'LoginController.user')//
Route.post('/api/login', 'LoginController.Login')//
Route.delete('/api/logout', 'LoginController.Logout').middleware(['auth', 'status'])//


Route.group(() => {

  Route.get('/roles','SeleccionarController.SeleccionarRoles').middleware(['Rol:1,2']);    

  Route.get('/usuario/:id?', 'SeleccionarController.SeleccionarUsuarios').middleware(['Rol:1'])


Route.get('/usuario/UP/:id', 'CambiarController.editUsuario').middleware('Rol:1')
Route.put('/usuario/:id', 'CambiarController.CambiarUsuario').where('id', /^[0-9]+$/).middleware(['Rol:1']);

Route.delete('/usuario/:id', 'BorrarController.borrarUsuario').where('id', /^[0-9]+$/).middleware(['Rol:1']);




Route.post('/cliente', 'InsertarController.insertarClientes').middleware(['Rol:1']);
Route.post('/provedor', 'InsertarController.insertarProvedores').middleware(['Rol:1']);
Route.post('/empleado', 'InsertarController.insertarEmpleados').middleware(['Rol:1']);
Route.post('/producto', 'InsertarController.insertarProductos').middleware(['Rol:1']);
Route.post('/compra', 'InsertarController.insertarCompras').middleware(['Rol:1']);

Route.get('/cliente/:id?', 'SeleccionarController.SeleccionarCliente').middleware('Rol:1,2')
Route.get('/provedor/:id?', 'SeleccionarController.SeleccionarProvedor').where('id', /^[0-9]+$/).middleware(['Rol:1,2']);
Route.get('/empleado/:id?', 'SeleccionarController.SeleccionarEmpleado').where('id', /^[0-9]+$/).middleware(['Rol:1,2']);
Route.get('/producto/:id?', 'SeleccionarController.SeleccionarProducto').where('id', /^[0-9]+$/).middleware(['Rol:1,2']);
Route.get('/compra/:id?', 'SeleccionarController.SeleccionarCompra').where('id', /^[0-9]+$/).middleware(['Rol:1,2']);


Route.get('/cliente/UP/:id', 'CambiarController.editCliente')//
Route.put('/cliente/:id', 'CambiarController.CambiarCliente').where('id', /^[0-9]+$/).middleware(['Rol:1']);

Route.get('/provedor/UP/:id', 'CambiarController.editProvedor')//
Route.put('/producto/:id', 'CambiarController.CambiarProducto').where('id', /^[0-9]+$/).middleware(['Rol:1']);

Route.get('/empleado/UP/:id', 'CambiarController.editEmpleado')//
Route.put('/empleado/:id', 'CambiarController.CambiarEmpleado').where('id', /^[0-9]+$/).middleware(['Rol:1']);

Route.get('/producto/UP/:id', 'CambiarController.editProducto')//
Route.put('/provedor/:id', 'CambiarController.CambiarProvedor').where('id', /^[0-9]+$/).middleware(['Rol:1']);

Route.delete('/cliente/:id', 'BorrarController.borrarCliente').where('id', /^[0-9]+$/).middleware(['Rol:1,']);
Route.delete('/provedor/:id', 'BorrarController.borrarProvedor').where('id', /^[0-9]+$/).middleware(['Rol:1']);
Route.delete('/empleado/:id', 'BorrarController.borrarEmpleado').where('id', /^[0-9]+$/).middleware(['Rol:1']);







Route.get('/editoriales', 'LibroController.mostrarEditoriales').middleware(['Rol:1,3']);
Route.get('/autores', 'LibroController.mostrarAutores').middleware(['Rol:1,3']);
Route.get('/pais', 'LibroController.mostrarPaises').middleware(['Rol:1,3']);
Route.get('/libros', 'LibroController.mostrarLibros').middleware(['Rol:1,3']);

Route.post('/editoriales', 'LibroController.insertarEditoriales').middleware(['Rol:1']);
Route.post('/autores', 'LibroController.insertarAutores').middleware(['Rol:1']);
Route.post('/pais', 'LibroController.insertarPaises').middleware(['Rol:1']);
Route.post('/libros', 'LibroController.insertarLibros').middleware(['Rol:1']);



Route.get('/editoriales/UP/:id', 'LibroController.editEditorial')//
Route.put('/editoriales/:id', 'LibroController.actualizarEditorial').middleware(['Rol:1']);

Route.get('/autores/UP/:id', 'LibroController.editAutor')//
Route.put('/autores/:id', 'LibroController.actualizarAutor').middleware(['Rol:1']);

Route.get('/pais/UP/:id', 'LibroController.editPais')//
Route.put('/pais/:id', 'LibroController.actualizarPais').middleware(['Rol:1']);

Route.get('/libros/UP/:id', 'LibroController.editLibro')//
Route.put('/libros/:id', 'LibroController.actualizarLibro').middleware(['Rol:1']);


Route.delete('/editoriales/:editorial', 'LibroController.eliminarEditorial').middleware(['Rol:1']);
Route.delete('/autores/:autor', 'LibroController.eliminarAutor').middleware(['Rol:1']);
Route.delete('/pais/:pais', 'LibroController.eliminarPais').middleware(['Rol:1']);
Route.delete('/libros/:libro', 'LibroController.eliminarLibro').middleware(['Rol:1']);



}).prefix('api/v2').middleware(['auth:api', 'status'])

Route.get('alumnos', 'SeleccionarController.mostrarAlumnos');

Route.get('stream', 'SeleccionarController.serverSentStream');

Route.post('alumnos/crear', 'InsertarController.insertarAlumno');

Route.delete('alumnos/destroy/:id', 'BorrarController.borrarAlumno');

Route.put('alumnos/:id/edit', 'CambiarController.cambiarAlumno');

Route.get('alumnos/:id/edit', 'CambiarController.editAlumno');


Route.get('partida', 'SeleccionarController.SeleccionarPartida');

Route.post('partida', 'InsertarController.insertarPartida');

Route.get('cambiarJugador', 'SeleccionarController.cambiarJugador');


Route.get('tiposensores', 'SeleccionarController.tipoSensor');//mostrardeterminadosensor
Route.put('/actualizarUbicacion/:id', 'SeleccionarController.actualizarUbicacion');//actualizarubicacion
Route.delete('/sensores/:id', 'SeleccionarController.deleteSensor');//eliminarSensor





Route.get('api/v2/sensores', 'SeleccionarController.sensores');//mostarsensores
Route.post('api/v2/sensores', 'SeleccionarController.addSensor');//insertarSensores
Route.delete('api/v2/sensores/:id', 'SeleccionarController.deleteSensor');//eliminarSensores
Route.get('/api/v2/sensores/UP/:id', 'SeleccionarController.obtenerSensor')//obtenerSensor
Route.put('/api/v2/sensores/:id', 'SeleccionarController.actualizarSensor')//actualizarSensor

Route.get('/api/v2/sensores/:id', 'SeleccionarController.obtenerDatos')//obtenerDatos

Route.get('api/v2/salones', 'SeleccionarController.obtenerSalones');//mostarsalones


Route.post('api/v2/salones', 'SeleccionarController.addSalon').middleware(['auth']);//insertarSalones
Route.delete('api/v2/salones/:id', 'SeleccionarController.deleteSalon');//eliminarSalones
Route.get('/api/v2/salones/UP/:id', 'SeleccionarController.obtenerSalon')//obtenerSalon
Route.put('/api/v2/salones/:id', 'SeleccionarController.actualizarSalon')//actualizarSensor






