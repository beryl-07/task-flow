import { Task, TaskPriority, TaskStatus } from "@prisma/client";
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDateOlderThan } from "../../utils/decorators/is-date-older.decorator";

export class CreateTaskDto
  implements Omit<Task, "id" | "createdAt" | "updatedAt">
{
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(255)
  @ApiProperty({
    minItems: 5,
  })
  title: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  assignedTo: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  @IsDateOlderThan("endAt", {
    message: "startAt must be older than endAt",
  })
  @ApiProperty()
  startAt: Date;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsNotEmpty()
  @ApiProperty()
  endAt: Date;

  @IsEnum(TaskStatus)
  @Transform(({ value }) => value as TaskStatus)
  @IsOptional()
  @ApiProperty({
    name: "status",
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status: TaskStatus;

  @IsEnum(TaskPriority)
  @IsOptional()
  @ApiProperty({
    name: "priority",
    enum: TaskPriority,
    default: TaskPriority.MEDIUM,
  })
  priority: TaskPriority;
}


export class deleteManyTaskDto {
  @IsString({ each: true })
  @ApiProperty({ isArray: true, type: String, required: false })
  @IsNotEmpty()  
  taskIds: string[];
}