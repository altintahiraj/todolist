import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { TodolistService } from "./todolist.service";
import { CreateDto } from './dto/create.dto';

@Controller('todolist')
export class TodolistController {
    constructor(private readonly todoService: TodolistService) { }

    @Get('all')
    public async getAllTasks() {
        return await this.todoService.getAllTasks();
    }

    @Post('create')
    public async createTodo(@Body() bodyPara: CreateDto) {
        return this.todoService.createTask(bodyPara);
    }


}
