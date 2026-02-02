import { Controller, Get, Post, Body, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { TodolistService } from "./todolist.service";
import { CreateDto } from './dto/create.dto';

@Controller('todolist')
export class TodolistController {
  constructor(private readonly todoService: TodolistService) {}

  @Get('all')
  public async getAllTasks() {
    return await this.todoService.getAllTasks();
  }

  @Post('create')
  public async createTodo(@Body() bodyPara: CreateDto) {
    return this.todoService.createTask(bodyPara);
  }

  // ✅ GET BY ID:  /todolist/:id
  @Get(':id')
  public async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.todoService.getById(id);
  }

  // ✅ DELETE BY ID: /todolist/:id
  @Delete(':id')
  public async deleteById(@Param('id', ParseIntPipe) id: number) {
    return await this.todoService.deleteById(id);
  }
}
