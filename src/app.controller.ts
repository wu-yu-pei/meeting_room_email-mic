import { Controller, Inject } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';

@Controller()
export class AppController {
  private readonly transporter: Transporter;

  constructor(
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {
    this.transporter = createTransport({
      host: this.configService.get('nodemailer_host'),
      port: this.configService.get('nodemailer_port'),
      secure: false,
      auth: {
        user: this.configService.get('nodemailer_auth_user'),
        pass: this.configService.get('nodemailer_auth_pass'),
      },
    });
  }

  @EventPattern('send-email-captcha')
  async sendEmailCaptcha({ to, subject, html }) {
    await this.transporter.sendMail({
      from: {
        name: '会议室预定系统',
        address: '495174699@qq.com',
      },
      to,
      subject,
      html,
    });
  }
}
