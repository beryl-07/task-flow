import { HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { EmailService } from "../email/email.service";
import { FilteringDto, PaginationDto, SortingDto } from "./dto/pagination.dto";
import { Prisma, Task, TaskPriority, TaskStatus } from "@prisma/client";

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
    // Prepare filtering object to pass to the Prisma query
    const where: Prisma.TaskWhereInput = {};
    if (filteringDto.assignedTo) {
      where.assignedTo = {
        in: filteringDto.assignedTo.split("."),
      };
    }
    if (filteringDto.status) {
      const status = filteringDto.status.split(".").filter((status) => {
        status = status.toUpperCase();
        if (status in TaskStatus) {
          return status;
        }
      });

      if (status.length !== 0) {
        where.status = {
          in: [...status.map((status) => status as TaskStatus)],
        };
      }
    }

    if (filteringDto.priority) {
      const priority = filteringDto.priority.split(".").filter((priority) => {
        priority = priority.toUpperCase();
        if (priority in TaskPriority) {
          console.log(priority);
          return priority;
        }
      });

      if (priority.length !== 0) {
        where.priority = {
          in: [...priority.map((priority) => priority as TaskPriority)],
        };
      }
    }

    if (filteringDto.from || filteringDto.to) {
      where.startAt = {
        gte: filteringDto.from,
        lte: filteringDto.to,
      };
    }

    // Add meta object to pass to the Prisma query
    const meta = {
      take: paginationDto.pageSize,
      skip: ((paginationDto.page || 1) - 1) * (paginationDto.pageSize || 10),
      orderBy: {
        [sortingDto.sortBy as string]: sortingDto.sortOrder,
      },
      where,
    };

    const tasks = await this.prisma.task.findMany({
      ...meta,
    });

    const total = await this.prisma.task.count({
      where,
    });

    return {
      data: tasks,
      meta: {
        total,
        page: paginationDto.page || 1,
        pageSize: paginationDto.pageSize || 10,
        canNext:
          total >
          meta.skip +
            (paginationDto.page || 1) * (paginationDto.pageSize || 10),
        canPrevious: meta.skip > 0,
        totalPages: Math.ceil(total / (paginationDto.pageSize || 10)),
      },
    };
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

  async deleteManyTasks(taskIds: string[]) {
    return this.prisma.task.deleteMany({
      where: {
        id: {
          in: taskIds,
        },
      },
    });
  }

  async getTasksForReminders(now: Date): Promise<Task[]> {
    const tasks = await this.prisma.task.findMany({
      where: {
        status: { not: TaskStatus.COMPLETED },
        endAt: {
          gt: now,
          lte: new Date(now.getTime() + 24 * 60 * 60 * 1000), // Within next 24 hours
        },
      },
    });

    console.log(tasks);
    return tasks;
  }
}
