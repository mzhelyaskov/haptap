import { User } from '@app/auth/entities/user.entity';
import { Comment } from '@app/comments/entities/comment.entity';
import { Product } from '@app/products/entities/product.entity';
import { Config } from '@app/services/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: Config.database.type,
      host: Config.database.host,
      port: Config.database.port,
      username: Config.database.username,
      password: Config.database.password,
      database: Config.database.name,
      synchronize: Config.database.synchronize,
      entities: [Comment, Product, User], // TODO use path configuration
      namingStrategy: new SnakeNamingStrategy(),
    }),
    TypeOrmModule.forFeature([Comment]),
  ],
  exports: [TypeOrmModule],
})
export class AppDatabaseModule {}