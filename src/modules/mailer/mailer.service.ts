import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { SendMailOptions } from './interfaces/mailer.interface';

@Injectable()
export class MailerService {
  private transporter: any;
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'vladyslav.hleb.diploma@gmail.com',
        pass: '630bd752-d844-42f4-b631-dadc2e91564f',
      },
    });
  }
  async sendEmail(mailOptions: SendMailOptions) {
    return new Promise((res, rej) => {
      this.transporter.sendMail(mailOptions, (mailerr, info) => {
        if (mailerr) {
          rej(mailerr);
        } else {
          res(info);
        }
      });
    });
  }
}
