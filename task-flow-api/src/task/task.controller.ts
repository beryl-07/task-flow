import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { TaskService } from "./task.service";
import { ApiOkResponse, ApiQuery, ApiTags } from "@nestjs/swagger";
import { deleteManyTaskEntity, TaskEntity } from "./entities/task.entity";
import { CreateTaskDto, deleteManyTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { FilteringDto, PaginationDto, SortingDto } from "./dto/pagination.dto";
import {
  FilteringEntity,
  PaginationEntity,
  SortingEntity,
} from "./entities/pagination.entity";

@Controller("tasks")
@ApiTags("Tasks")
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get("/")
  @ApiOkResponse({
    type: TaskEntity,
    isArray: true,
    description: "Get all tasks",
  })
  @ApiQuery({
    type: PaginationEntity,
    name: "pagination",
    required: false,
  })
  @ApiQuery({
    type: SortingEntity,
    name: "sorting",
    required: false,
  })
  @ApiQuery({
    type: FilteringEntity,
    name: "filtering",
    required: false,
  })
  getTasks(
    @Query() paginationDto: PaginationDto,
    @Query() sortingDto: SortingDto,
    @Query() filteringDto: FilteringDto,
  ) {
    return this.taskService.getTasks(paginationDto, sortingDto, filteringDto);
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

  @Post("/deleteMany")
  @ApiOkResponse({
    type: deleteManyTaskEntity,
    description: "Delete many tasks",
  })
  deleteManyTasks(@Body() taskIds: deleteManyTaskDto) {
    return this.taskService.deleteManyTasks(taskIds.taskIds);
  }
}
