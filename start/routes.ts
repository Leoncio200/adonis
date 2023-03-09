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

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})
Route.get('/prueba2', 'PaisController.SeleccionarPais')

Route.put('/Validacion', 'PaisController.SeleccionarPais')
Route.post('/user', 'LoginController.user')//
Route.post('/login', 'LoginController.Login')//
Route.delete('/logout', 'LoginController.prueba').middleware(['auth', 'rol:1'])


Route.get('/roles', 'LoginController.Login')//

Route.get('/usuario/:id?', 'SeleccionarController.SeleccionarUsuarios')//

Route.get('/usuario/UP/:id', 'CambiarController.editUsuario')//
Route.put('/usuario/:id?', 'CambiarController.CambiarUsuario')//

Route.delete('/usuario/:id', 'BorrarController.borrarUsuario')//



Route.post('/cliente', 'InsertarController.insertarClientes')//
Route.post('/provedor', 'InsertarController.insertarProvedores')//
Route.post('/empleado', 'InsertarController.insertarEmpleados')//
Route.post('/producto', 'InsertarController.insertarProductos')//
Route.post('/compra', 'InsertarController.insertarCompras')//

Route.get('/cliente/:id?', 'SeleccionarController.SeleccionarCliente')//
Route.get('/provedor/:id?', 'SeleccionarController.SeleccionarProvedor')//
Route.get('/empleado/:id?', 'SeleccionarController.SeleccionarEmpleado')//
Route.get('/producto/:id?', 'SeleccionarController.SeleccionarProducto')//
Route.get('/compra/:id?', 'SeleccionarController.SeleccionarCompra')//


Route.get('/cliente/UP/:id', 'CambiarController.editCliente')//
Route.put('/cliente/:id', 'CambiarController.CambiarCliente')//

Route.get('/provedor/UP/:id', 'CambiarController.editProvedor')//
Route.put('/producto/:id', 'CambiarController.CambiarProducto')//

Route.get('/empleado/UP/:id', 'CambiarController.editEmpleado')//
Route.put('/empleado/:id', 'CambiarController.CambiarEmpleado')//

Route.get('/producto/UP/:id', 'CambiarController.editProducto')//
Route.put('/provedor/:id', 'CambiarController.CambiarProvedor')//

Route.delete('/cliente/:id', 'BorrarController.borrarCliente')//
Route.delete('/provedor/:id', 'BorrarController.borrarProvedor')//
Route.delete('/empleado/:id', 'BorrarController.borrarEmpleado')//







Route.get('/editoriales', 'LibroController.mostrarEditoriales')//
Route.get('/autores', 'LibroController.mostrarAutores')//
Route.get('/pais', 'LibroController.mostrarPaises')//
Route.get('/libros', 'LibroController.mostrarLibros')//

Route.post('/editoriales', 'LibroController.insertarEditoriales')//
Route.post('/autores', 'LibroController.insertarAutores')//
Route.post('/pais', 'LibroController.insertarPaises')//
Route.post('/libros', 'LibroController.insertarLibros')//



Route.get('/editoriales/UP/:id', 'LibroController.editEditorial')//
Route.put('/editoriales/:id', 'LibroController.actualizarEditorial')//

Route.get('/autores/UP/:id', 'LibroController.editAutor')//
Route.put('/autores/:id', 'LibroController.actualizarAutor')//

Route.get('/pais/UP/:id', 'LibroController.editPais')//
Route.put('/pais/:id', 'LibroController.actualizarPais')//

Route.get('/libros/UP/:id', 'LibroController.editLibro')//
Route.put('/libros/:id', 'LibroController.actualizarLibro')//


Route.delete('/editoriales/:editorial', 'LibroController.eliminarEditorial')//
Route.delete('/autores/:autor', 'LibroController.eliminarAutor')//
Route.delete('/pais/:pais', 'LibroController.eliminarPais')//
Route.delete('/libros/:libro', 'LibroController.eliminarLibro')//
