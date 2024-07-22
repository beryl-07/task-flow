import { Injectable, Logger } from "@nestjs/common";
import { TaskService } from "../task/task.service";
import { Cron, CronExpression } from "@nestjs/schedule";
import { EmailService } from "../email/email.service";

@Injectable()
export class ReminderService {
  private readonly logger = new Logger(ReminderService.name);

  constructor(
    private readonly taskService: TaskService,
    private readonly emailService: EmailService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async handleCron() {
    this.logger.debug("Running reminder cron job");
    const now = new Date();
    const tasks = await this.taskService.getTasksForReminders(now);

    for (const task of tasks) {
      const timeUntilDeadline = task.endAt.getTime() - now.getTime();
      const reminders = [
        { time: 24 * 60 * 60 * 1000, message: "24 heures" },
        { time: 60 * 60 * 1000, message: "1 heure" },
        { time: 30 * 60 * 1000, message: "30 minutes" },
        { time: 5 * 60 * 1000, message: "5 minutes" },
      ];

      for (const reminder of reminders) {
        if (
          timeUntilDeadline <= reminder.time &&
          timeUntilDeadline > reminder.time - 60000
        ) {
          try {
            await this.emailService.sendReminderEmail(task, reminder.message);
            this.logger.log(
              `Sent reminder for task ${task.id}: ${reminder.message} remaining`,
            );
          } catch (error) {
            this.logger.error(
              `Failed to send reminder for task ${task.id}: ${error.message}`,
            );
          }
          break;
        }
      }
    }
  }
}
