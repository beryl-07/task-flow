import { Injectable, Logger } from "@nestjs/common";
// import { TaskService } from "../task/task.service";
import { Cron, CronExpression } from "@nestjs/schedule";

@Injectable()
export class ReminderService {
  // private readonly logger = new Logger(ReminderService.name);
  //
  // constructor(private readonly taskService: TaskService) {}
  //
  // @Cron(CronExpression.EVERY_MINUTE)
  // async handleReminderCron() {
  //   this.logger.debug("Checking for tasks that are due");
  // }
}
