import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { TaskService } from "./task.service";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { TaskEntity } from "./entities/task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";

@Controller("tasks")
@ApiTags("articles")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get("/")
  @ApiOkResponse({
    type: TaskEntity,
    isArray: true,
    description: "Get all tasks",
  })
  getTasks() {
    return this.taskService.getTasks();
  }

  @Get("/:taskId")
  @ApiOkResponse({
    type: TaskEntity,
    description: "Get task by id",
  })
  getTaskById(@Param("taskId") taskId: string) {
    return this.taskService.getTaskById(taskId);
  }

  @Post("/")
  @ApiOkResponse({
    type: TaskEntity,
    description: "Create task",
  })
  createTask(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch("/:taskId")
  @ApiOkResponse({
    type: TaskEntity,
    description: "Update task",
  })
  updateTask(
    @Param("taskId") taskId: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(taskId, updateTaskDto);
  }

  @Delete("/:taskId")
  @ApiOkResponse({
    type: TaskEntity,
    description: "Delete task",
  })
  deleteTask(@Param("taskId") taskId: string) {
    return this.taskService.deleteTask(taskId);
  }
}
