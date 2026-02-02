import { HttpException, Injectable } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { TodoEntity } from './Entity/todo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDto } from './dto/create.dto';

@Injectable()
export class TodolistService {
    constructor(@InjectRepository(TodoEntity) private readonly todoRepository: Repository<TodoEntity>) { }

    public async getAllTasks() {
        try {
            const result = await this.todoRepository.find();
            return result;
        } catch (error) {
            throw new HttpException('We could not found date', HttpStatus.NOT_FOUND);
        }
    }

    public async createTask(data: CreateDto) {
        try {
            const result = await this.todoRepository.save(data);
            return result;
        } catch (error) {
            throw new HttpException('We could not create a new task', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async getById(id: number) {
        try {
            const task = await this.todoRepository.findOneBy({ id });
            if (!task) {
                throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
            }
            return task;
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new HttpException('We could not retrieve the task', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    public async deleteById(id: number) {
        try {
            const result = await this.todoRepository.delete(id);
            if (result.affected === 0) {
                throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
            }
            return { deleted: true };
        } catch (error) {
            if (error instanceof HttpException) throw error;
            throw new HttpException('We could not delete the task', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
