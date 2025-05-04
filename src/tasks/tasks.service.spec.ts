import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from './tasks.service';
import { TaskStatus } from './task-status.enum';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

jest.mock('../db/connection', () => ({
  db: {
    insertInto: jest.fn().mockReturnThis(),
    values: jest.fn().mockReturnThis(),
    returningAll: jest.fn().mockReturnThis(),
    executeTakeFirst: jest.fn(),
    selectFrom: jest.fn().mockReturnThis(),
    selectAll: jest.fn().mockReturnThis(),
    where: jest.fn().mockReturnThis(),
    execute: jest.fn(),
    updateTable: jest.fn().mockReturnThis(),
    set: jest.fn().mockReturnThis(),
    deleteFrom: jest.fn().mockReturnThis(),
  },
}));

describe('TasksService', () => {
  let service: TasksService;
  let mockDb;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
    }).compile();

    service = module.get<TasksService>(TasksService);
    mockDb = require('../db/connection').db;
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a task with default status', async () => {
      const dto: CreateTaskDto = { title: 'Test', description: 'Desc' };
      const expected = { id: 1, ...dto, status: TaskStatus.Pending };
      mockDb.executeTakeFirst.mockResolvedValue(expected);

      const result = await service.create(dto);
      expect(result).toEqual(expected);
    });

    it('should throw BadRequestException for invalid status', async () => {
      const invalidDto = { title: 'Test', description: 'Desc', status: 'invalid' as TaskStatus };
      await expect(service.create(invalidDto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return all tasks', async () => {
      const tasks = [{ id: 1, title: 'A' }, { id: 2, title: 'B' }];
      mockDb.execute.mockResolvedValue(tasks);

      const result = await service.findAll();
      expect(result).toEqual(tasks);
    });
  });

  describe('findByStatus', () => {
    it('should return tasks with given status', async () => {
      const tasks = [{ id: 1, status: TaskStatus.Pending }];
      mockDb.execute.mockResolvedValue(tasks);

      const result = await service.findByStatus(TaskStatus.Pending);
      expect(result).toEqual(tasks);
    });

    it('should throw BadRequestException for invalid status', async () => {
      await expect(service.findByStatus('x' as TaskStatus)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findById', () => {
    it('should return task if found', async () => {
      const task = { id: 1, title: 'X' };
      mockDb.executeTakeFirst.mockResolvedValue(task);

      const result = await service.findById(1);
      expect(result).toEqual(task);
    });

    it('should throw NotFoundException if task not found', async () => {
      mockDb.executeTakeFirst.mockResolvedValue(undefined);

      await expect(service.findById(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and return the task', async () => {
      const dto: UpdateTaskDto = { title: 'Updated', status: TaskStatus.Completed };
      const updated = { id: 1, ...dto };
      mockDb.executeTakeFirst.mockResolvedValue(updated);

      const result = await service.update(1, dto);
      expect(result).toEqual(updated);
    });

    it('should throw BadRequestException for invalid status', async () => {
      const invalidDto = { status: 'invalid' as TaskStatus };
      await expect(service.update(1, invalidDto)).rejects.toThrow(BadRequestException);
    });

    it('should throw NotFoundException if task not updated', async () => {
      const dto: UpdateTaskDto = { title: 'Any' };
      mockDb.executeTakeFirst.mockResolvedValue(undefined);

      await expect(service.update(999, dto)).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('should delete and return the task', async () => {
      const task = { id: 1, title: 'To delete' };
      mockDb.executeTakeFirst.mockResolvedValue(task);
      mockDb.execute.mockResolvedValue([task]);

      const result = await service.remove(1);
      expect(result).toEqual(task);
    });

    it('should throw NotFoundException if task not found for delete', async () => {
      mockDb.executeTakeFirst.mockResolvedValue(undefined);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
