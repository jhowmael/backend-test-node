import { IsOptional, IsIn } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class FindTasksDto {
  @ApiPropertyOptional({
    enum: ['pending', 'in-progress', 'completed'],
    description: 'Filter by task status',
    example: 'pending',
  })
  @IsOptional()
  @IsIn(['pending', 'in-progress', 'completed'], {
    message: 'Status must be one of: pending, in-progress, completed',
  })
  status?: string;
}
