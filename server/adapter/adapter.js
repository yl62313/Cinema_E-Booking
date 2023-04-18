const nodemailer = require('nodemailer');

class EmailAdapter {
  constructor(auth) {
    this.auth = auth;
    this.transporter = nodemailer.createTransport({
      host: 'smtp-mail.outlook.com',
      port: 587,
      secure: false,
      auth: this.auth
    });
  }

  async sendMail(options) {
    await this.transporter.sendMail(options);
  }
}

module.exports = EmailAdapter;
