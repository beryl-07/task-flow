import { Task, TaskPriority, TaskStatus } from "@prisma/client";
import { ApiProperty } from "@nestjs/swagger";

export class TaskEntity implements Task {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false, nullable: true })
  description: string | null;

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
