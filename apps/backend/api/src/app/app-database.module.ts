import { ENV_CONFIG, EnvConfig } from '@@be-api/environments';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { globSync } from 'glob';
import * as path from 'path';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { EntitySchema } from 'typeorm';

const entities: EntitySchema[] = getEntities();

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ENV_CONFIG],
      useFactory: (env: EnvConfig) => {
        return {
          type: env.database.type,
          host: env.database.host,
          port: env.database.port,
          username: env.database.username,
          password: env.database.password,
          database: env.database.name,
          synchronize: env.database.synchronize,
          namingStrategy: new SnakeNamingStrategy(),
          entities: []
        };
      },
    }),
    TypeOrmModule.forFeature(entities),
  ],
  exports: [TypeOrmModule],
})
export class AppDatabaseModule {}

function getEntities(): EntitySchema[] {
  return globSync(path.join(__dirname, '**/*.entity.ts'))
    .map((file: string) => Object.values(require(file)))
    .flat() as EntitySchema[];
}
