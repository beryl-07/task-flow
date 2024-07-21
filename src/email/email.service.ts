import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { Task } from "@prisma/client";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendAssignmentEmail(task: Task) {
    const mailerOptions = {
      to: task.assignedTo,
      subject: `Task Assigned: ${task.name}`,
      text: `<p>You have been assigned a task with the following details: <strong>${task.description}</strong></p>`,
    };

    await this.mailerService.sendMail(mailerOptions);
  }
}
