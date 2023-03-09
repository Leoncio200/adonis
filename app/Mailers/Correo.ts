import { BaseMailer, MessageContract } from '@ioc:Adonis/Addons/Mail'
//import View from '@ioc:Adonis/Core/View'
import  User  from 'App/Models/User'
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
   *
   * Use this method to prepare the email message. The method can
   * also be async.
   */
  public prepare(message: MessageContract) {
    message
    .subject('The email subject')
    .from('leonciopimentelperez@gmail.com')
    .to(this.user.email)
    .htmlView('emails/welcome', {
      user: { fullName: `${this.user.name}` },
      url: 'https://your-app.com/verification-url',
    })
  }
}
