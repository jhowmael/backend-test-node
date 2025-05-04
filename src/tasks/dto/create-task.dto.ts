import { IsString, IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from '../task-status.enum'; 

export class CreateTaskDto {
  @ApiProperty({ example: 'Your task title' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'Your task description', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 'Yor task status',
    description: 'The status of the task',
    enum: TaskStatus,
    required: false,
  })
  @IsOptional()
  @IsEnum(TaskStatus, { message: 'Status must be one of: pending, in-progress, completed' })
  status?: TaskStatus;
}
