import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Injectable()
export class TaskService {
  constructor(private readonly prisma: PrismaService) {}
  async getTasks() {
    return this.prisma.task.findMany();
  }

  async getTaskById(taskId: string) {
    return this.prisma.task.findUnique({
      where: {
        id: taskId,
      },
    });
  }

  async createTask(createTaskDto: CreateTaskDto) {
    return this.prisma.task.create({
      data: createTaskDto,
    });
  }

  async updateTask(taskId: string, createTaskDto: UpdateTaskDto) {
    return this.prisma.task.update({
      where: {
        id: taskId,
      },
      data: createTaskDto,
    });
  }

  async deleteTask(taskId: string) {
    return this.prisma.task.delete({
      where: {
        id: taskId,
      },
    });
  }
}
