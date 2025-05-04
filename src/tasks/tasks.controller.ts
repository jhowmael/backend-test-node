import { Controller, Get, Post, Body, Param, Delete, Patch, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiBody, ApiParam, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './task-status.enum';

@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Post()
  @ApiOperation({ summary: 'Create new task', description: 'Create a new task, with the values ​​entered' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: 201, description: 'Task created successfully' })
  async create(@Body() createTaskDto: CreateTaskDto) {
    return this.tasksService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all tasks', description: 'Returns a list of all tasks stored in the database' })
  @ApiResponse({ status: 200, description: 'All tasks retrieved successfully' })
  async findAll() {
    return this.tasksService.findAll();
  }

  @Get('status/:status')
  @ApiOperation({ summary: 'Find tasks by status', description: 'Returns only tasks with the selected status' })
  @ApiParam({name: 'status', enum: TaskStatus})
  @ApiResponse({ status: 200, description: 'Tasks retrieved successfully' })
  @ApiResponse({ status: 404, description: 'No tasks found for the given status' })
  async findByStatus(@Param('status') status: TaskStatus) {
    return this.tasksService.findByStatus(status);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find tasks by ID', description: 'Returns only tasks with the selected ID' })
  @ApiParam({ name: 'id'})
  @ApiResponse({ status: 200, description: 'Task found successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async findById(@Param('id') id: string) {
    const task = await this.tasksService.findById(+id);

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Edit task by ID', description: 'Edit only tasks with the selected ID' })
  @ApiParam({ name: 'id'})
  @ApiBody({ type: UpdateTaskDto })
  @ApiResponse({ status: 200, description: 'Task updated successfully' })
  @ApiResponse({ status: 404, description: 'Task not found for update' })
  async update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    const updatedTask = await this.tasksService.update(+id, updateTaskDto);

    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${id} not found for update`);
    }

    return updatedTask;
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete task by ID', description: 'Delete only tasks with the selected ID' })
  @ApiParam({ name: 'id'})
  @ApiResponse({ status: 200, description: 'Task deleted successfully' })
  @ApiResponse({ status: 404, description: 'Task not found for deletion' })
  async remove(@Param('id') id: string) {
    const taskToDelete = await this.tasksService.remove(+id);

    if (!taskToDelete) {
      throw new NotFoundException(`Task with ID ${id} not found for deletion`);
    }

    return taskToDelete;
  }
}
