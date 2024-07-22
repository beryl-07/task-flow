import { Module } from "@nestjs/common";
import { TaskController } from "./task.controller";
import { TaskService } from "./task.service";
import { PrismaModule } from "../prisma/prisma.module";
import { EmailService } from "../email/email.service";

@Module({
  controllers: [TaskController],
  providers: [TaskService, EmailService],
  imports: [PrismaModule],
  exports: [TaskService],
})
export class TaskModule {}
