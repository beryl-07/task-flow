import { TaskPriority, TaskStatus } from "@prisma/client";
import {
  IsDate,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsDateOlderThan } from "../../utils/decorators/is-date-older.decorator";

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  @MinLength(5)
  @ApiProperty({
    minItems: 5,
  })
  name: string;

  @IsString()
  @IsOptional()
  @IsOptional()
  @MaxLength(255)
  @ApiProperty({ required: false, maxLength: 255 })
  description?: string;

  @IsEmail()
  @IsOptional()
  @ApiProperty()
  assignedTo: string;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsOptional()
  @IsDateOlderThan("endAt", {
    message: "startAt must be older than endAt",
  })
  @ApiProperty()
  startAt: Date;

  @Transform(({ value }) => new Date(value))
  @IsDate()
  @IsOptional()
  @ApiProperty()
  endAt: Date;

  @IsEnum(TaskStatus)
  @IsOptional()
  @ApiProperty({
    name: "TaskStatus",
    enum: TaskStatus,
    default: TaskStatus.TODO,
  })
  status: TaskStatus = TaskStatus.TODO;

  @IsEnum(TaskPriority)
  @IsOptional()
  @ApiProperty({
    name: "TaskPriority",
    enum: TaskPriority,
    default: TaskPriority.MEDIUM,
  })
  priority: TaskPriority = TaskPriority.MEDIUM;
}
