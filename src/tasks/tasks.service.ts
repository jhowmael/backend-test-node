import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { db } from '../db/connection';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FindTasksDto } from './dto/find-tasks.dto';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  private validateStatus(status: TaskStatus) {
    const validStatuses = Object.values(TaskStatus);
    if (!validStatuses.includes(status)) {
      throw new BadRequestException('Invalid status, must be one of: pending, in-progress, completed');
    }
  }

  async create(dto: CreateTaskDto) {
    const status = dto.status || TaskStatus.Pending; // Default para 'Pending'
    this.validateStatus(status);

    const result = await db
      .insertInto('tasks')
      .values({
        title: dto.title,
        description: dto.description,
        status: status,
      })
      .returningAll()
      .executeTakeFirst();

    return result;
  }

  async findAll() {
    return await db.selectFrom('tasks').selectAll().execute();
  }

  async findByStatus(status: TaskStatus) {
    this.validateStatus(status); // Garantir que o status é válido

    return db
      .selectFrom('tasks')
      .selectAll()
      .where('status', '=', status)
      .execute();
  }

  async findById(id: number) {
    const task = await db
      .selectFrom('tasks')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  async update(id: number, dto: UpdateTaskDto) {
    if (dto.status) {
      this.validateStatus(dto.status); 
    }

    const updatedTask = await db
      .updateTable('tasks')
      .set({
        title: dto.title,
        description: dto.description,
        status: dto.status,
        updated_at: new Date(),
      })
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirst();

    if (!updatedTask) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return updatedTask;
  }

  async remove(id: number) {
    const task = await this.findById(id); 

    const result = await db
      .deleteFrom('tasks')
      .where('id', '=', id)
      .returningAll()
      .executeTakeFirst();

    return result;
  }
}
