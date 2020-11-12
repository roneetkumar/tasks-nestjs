import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTaskDTO } from './dto/create-task.dto';
import { GetTasksFilterDTO } from './dto/get-tasks-filter.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation-pipe';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  //   @Get()
  //   getTasks(
  //     @Query(ValidationPipe)
  //     filterDTO: GetTasksFilterDTO,
  //   ): Task[] {
  //     if (Object.keys(filterDTO).length) {
  //       return this.tasksService.getTasksWithFilters(filterDTO);
  //     } else {
  //       return this.tasksService.getAllTasks();
  //     }
  //   }

  @Get('/:id')
  getTaskById(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDTO: CreateTaskDTO): Promise<Task> {
    return this.tasksService.createTask(createTaskDTO);
  }

  //   @Patch('/:id/status')
  //   updateTaskStatus(
  //     @Param('id') id: string,
  //     @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  //   ): Task {
  //     return this.tasksService.updateTaskStatus(id, status);
  //   }

  //   @Delete('/:id')
  //   deleteTask(@Param('id') id: string): void {
  //     this.tasksService.deleteTask(id);
  //   }
}
