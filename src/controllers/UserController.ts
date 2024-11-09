import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/modules/user/DTOs/CreateUserDto';
import { UpdateUserDto } from 'src/modules/user/DTOs/UpdateUserrDto';
import { User } from 'src/modules/user/entites/User';
import { UserRepository } from 'src/repository/UserRepository';

@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}

  @Post()
  @ApiOperation({ summary: 'Adiciona um novo usuário' })
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.userRepository.create(createUserDto);
    } catch (error) {
      throw new HttpException('Erro ao criar usuário', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @ApiOperation({ summary: 'Retorna todos os users' })
  async findAll(): Promise<User[]> {
    return await this.userRepository.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Pega um usuário por ID' })
  async findOne(@Param('id') id: number): Promise<User | null> {
    return await this.userRepository.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Edita um usuário' })
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<User | null> {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      return await this.userRepository.update(id, updateUserDto);
    } catch (error) {
      throw new HttpException('Error updating user', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deleta um usuário' })
  async remove(@Param('id') id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}