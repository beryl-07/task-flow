import { Task, TaskPriority, TaskStatus } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class TaskEntity implements Task {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  assignedTo: string;

  @ApiProperty()
  startAt: Date;

  @ApiProperty()
  endAt: Date;

  @ApiProperty()
  status: TaskStatus;

  @ApiProperty()
  priority: TaskPriority;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class deleteManyTaskEntity {
  @ApiProperty()
  taskId: string[];
}