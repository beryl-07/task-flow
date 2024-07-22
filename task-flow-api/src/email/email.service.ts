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
      subject: `Task Assigned: ${task.title}`,
      html: `<p>You have been assigned a task <b>${task.title}</b>. It will <b>start at </b> <b>${task.startAt}</b> and <b>end at</b> <b>${task.endAt}</b>.
      Get details of task with her id: ${task.id}. Her <b>priority</b> is: <b>${task.priority}</b></p>`,
    };

    await this.mailerService.sendMail(mailerOptions);
  }

  async sendReminderEmail(task: Task, timeRemaining: string) {
    const mailerOptions = {
      to: task.assignedTo,
      subject: `Reminder: ${task.title} task to be completed in ${timeRemaining}.`,
      html: `Reminder: Your task ${task.title} must be completed before ${task.endAt}.
      Get details of task with her id: ${task.id}. Her <b>priority</b> it was: <b>${task.priority}</b></p>`,
    };

    await this.mailerService.sendMail(mailerOptions);
  }
}
