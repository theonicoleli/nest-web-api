import { IsNotEmpty, IsString, IsInt, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'João Silva', description: 'Nome do usuário' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '12345678901', description: 'CPF do usuário com 11 dígitos' })
  @IsNotEmpty()
  @IsString()
  @Matches(/^\d{11}$/, { message: 'CPF must be 11 digits' })
  cpf: string;

  @ApiProperty({ example: 30, description: 'Idade do usuário' })
  @IsNotEmpty()
  @IsInt({ message: 'Age must be an integer' })
  age: number;

  @ApiProperty({ example: 'admin', description: 'Cargo ou função do usuário' })
  @IsNotEmpty()
  @IsString()
  role: string;
}
