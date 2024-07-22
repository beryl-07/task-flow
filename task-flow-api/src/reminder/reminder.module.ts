import { Module } from "@nestjs/common";
import { ReminderService } from "./reminder.service";
import { TaskModule } from "../task/task.module";
import { EmailModule } from "../email/email.module";

@Module({
  imports: [TaskModule, EmailModule],
  controllers: [],
  providers: [ReminderService],
})
export class ReminderModule {}
