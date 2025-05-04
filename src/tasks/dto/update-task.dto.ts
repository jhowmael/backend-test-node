import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsEnum } from 'class-validator';
import { TaskStatus } from '../task-status.enum'; // Importando a enum TaskStatus

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @ApiPropertyOptional({ example: 'New task title' })
  @IsOptional()
  title?: string;

  @ApiPropertyOptional({ example: 'New task description' })
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    example: 'New task status',
    description: 'Task status (must be: pending, in-progress, or completed)',
  })
  
  @IsOptional()
  @IsEnum(TaskStatus, { message: 'Status must be one of: pending, in-progress, completed' })
  status?: TaskStatus;
}
