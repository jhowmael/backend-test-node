import { Test, TestingModule } from '@nestjs/testing';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './task-status.enum';

describe('TasksController', () => {
  let app: INestApplication;
  let tasksService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findByStatus: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [{ provide: TasksService, useValue: tasksService }],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('POST /tasks', () => {
    it('should create a task', async () => {
      const dto: CreateTaskDto = { title: 'Test Task', description: 'Description', status: TaskStatus.Pending };
      const mockResult = { id: 1, ...dto };

      tasksService.create.mockResolvedValue(mockResult);

      const response = await request(app.getHttpServer())
        .post('/tasks')
        .send(dto)
        .expect(201);

      expect(response.body).toEqual(mockResult);
    });
  });

  describe('GET /tasks', () => {
    it('should return all tasks', async () => {
      const mockResult = [{ id: 1, title: 'Task1', description: '', status: TaskStatus.Pending }];
      tasksService.findAll.mockResolvedValue(mockResult);

      const response = await request(app.getHttpServer())
        .get('/tasks')
        .expect(200);

      expect(response.body).toEqual(mockResult);
    });
  });

  describe('GET /tasks/status/:status', () => {
    it('should return tasks with given status', async () => {
      const status = TaskStatus.Pending;
      const mockResult = [{ id: 1, title: 'Task1', status }];
      tasksService.findByStatus.mockResolvedValue(mockResult);

      const response = await request(app.getHttpServer())
        .get(`/tasks/status/${status}`)
        .expect(200);

      expect(response.body).toEqual(mockResult);
    });
  });

  describe('GET /tasks/:id', () => {
    it('should return a task by id', async () => {
      const id = 1;
      const mockResult = { id, title: 'Task', description: '', status: TaskStatus.Pending };
      tasksService.findById.mockResolvedValue(mockResult);

      const response = await request(app.getHttpServer())
        .get(`/tasks/${id}`)
        .expect(200);

      expect(response.body).toEqual(mockResult);
    });

    it('should return 404 if task not found', async () => {
      tasksService.findById.mockResolvedValue(null);

      await request(app.getHttpServer())
        .get('/tasks/999')
        .expect(404);
    });
  });

  describe('PATCH /tasks/:id', () => {
    it('should update a task', async () => {
      const id = 1;
      const dto: UpdateTaskDto = { title: 'Updated', description: '', status: TaskStatus.Completed };
      const mockResult = { id, ...dto };
      tasksService.update.mockResolvedValue(mockResult);

      const response = await request(app.getHttpServer())
        .patch(`/tasks/${id}`)
        .send(dto)
        .expect(200);

      expect(response.body).toEqual(mockResult);
    });

    it('should return 404 if task not found for update', async () => {
      tasksService.update.mockResolvedValue(null);

      await request(app.getHttpServer())
        .patch('/tasks/999')
        .send({ title: 'Test' })
        .expect(404);
    });
  });

  describe('DELETE /tasks/:id', () => {
    it('should delete a task', async () => {
      const mockResult = { id: 1, title: 'Deleted Task', status: TaskStatus.Pending };
      tasksService.remove.mockResolvedValue(mockResult);

      const response = await request(app.getHttpServer())
        .delete('/tasks/1')
        .expect(200);

      expect(response.body).toEqual(mockResult);
    });

    it('should return 404 if task not found for deletion', async () => {
      tasksService.remove.mockResolvedValue(null);

      await request(app.getHttpServer())
        .delete('/tasks/999')
        .expect(404);
    });
  });
});
