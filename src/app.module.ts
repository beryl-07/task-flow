import { Module } from "@nestjs/common";
import { TaskModule } from "./task/task.module";
import { PrismaModule } from "./prisma/prisma.module";

@Module({
  imports: [PrismaModule, TaskModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
