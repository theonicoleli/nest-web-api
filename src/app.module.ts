import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './modules/user/UserModule';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5336,
      username: 'pguser',
      password: 'pgpassword',
      database: 'nest-api',
      autoLoadEntities: true, // Carrega automaticamente as entidades
      synchronize: false, // Desative synchronize ao usar migrations em produção
      migrations: ['dist/migrations/*.js'], // Diretório onde as migrations compiladas estarão
      migrationsRun: true, // Roda as migrations automaticamente ao iniciar a aplicação
    }),
    UserModule,
  ],
})
export class AppModule {}
