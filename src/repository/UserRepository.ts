import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/modules/user/DTOs/CreateUserDto';
import { UpdateUserDto } from 'src/modules/user/DTOs/UpdateUserrDto';
import { User } from 'src/modules/user/entites/User';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,   

  ) {}

  async create(user: CreateUserDto): Promise<User> {
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id });
  }

  async findByCpf(cpf: string): Promise<User | null> {
    return await this.userRepository.findOneBy({ cpf });
  }

  async update(id: number, user: Partial<UpdateUserDto>): Promise<User | null> {
    const existingUser = await this.findById(id);
    if (!existingUser) {
      return null;
    }

    Object.assign(existingUser, user);
    return await this.userRepository.save(existingUser);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}