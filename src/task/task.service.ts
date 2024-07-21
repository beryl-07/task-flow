import { HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { EmailService } from "../email/email.service";
import { FilteringDto, PaginationDto, SortingDto } from "./dto/pagination.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class TaskService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}
  async getTasks(
    paginationDto: PaginationDto,
    sortingDto: SortingDto,
    filteringDto: FilteringDto,
  ) {
    console.log(paginationDto, sortingDto, filteringDto);

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
    const task = await this.prisma.task.create({ data: createTaskDto });
    await this.emailService.sendAssignmentEmail(task).catch((error) => {
      throw new Error(
        `Failed to send assignment email: ${HttpStatus.INTERNAL_SERVER_ERROR}\n ${error.message}`,
      );
    });
    return task;
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
