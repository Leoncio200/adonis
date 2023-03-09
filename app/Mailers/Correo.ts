import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
//import View from '@ioc:Adonis/Core/View'
import  User  from 'App/Models/User'
import Route from '@ioc:Adonis/Core/Route'
export default class Correo extends BaseMailer {
  constructor (private user: User) {
    super()
  }
  /**
   * WANT TO USE A DIFFERENT MAILER?
   *
   * Uncomment the following line of code to use a different
   * mailer and chain the ".options" method to pass custom
   * options to the send method
   */
  // public mailer = this.mail.use()
  //public html = View.render('emails/welcome')
  /**
   * The prepare method is invoked automatically when you run
   * "Correo.send".
   *http://192.168.125.235:3333${Route.makeSignedUrl('validacion',{
        user:`1`
      })}
   * Use this method to prepare the email message. The method can
   * also be async.
   */
  public prepare(message: MessageContract) {
    message
    .subject('Validacion')
    .from('leonciopimentelperez@gmail.com')
    .to(this.user.email)
    .html(`<h1> Welcome ${this.user.name} </h1><p><a href="http://192.168.125.235:3333${Route.makeSignedUrl('validacion',{user:this.user.id})}">Click here</a> to verify your email address.</p>`)
  }
}
