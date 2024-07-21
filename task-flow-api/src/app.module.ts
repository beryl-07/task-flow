import { Module } from "@nestjs/common";
import { TaskModule } from "./task/task.module";
import { PrismaModule } from "./prisma/prisma.module";
import { EmailModule } from "./email/email.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { MailerModule } from "@nestjs-modules/mailer";
import { ReminderModule } from './reminder/reminder.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}.local`,
      isGlobal: true,
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        service: configService.get<string>("SMTP_SERVICE"),
        transport: {
          host: configService.get<string>("SMTP_HOST"),
          port: configService.get<number>("SMTP_PORT"),
          auth: {
            user: configService.get<string>("NODEMAILER_EMAIL"),
            pass: configService.get<string>("NODEMAILER_PASSWORD"),
          },
        },
      }),
    }),
    PrismaModule,
    TaskModule,
    EmailModule,
    ReminderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
