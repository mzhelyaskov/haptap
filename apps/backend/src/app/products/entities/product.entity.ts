import { Comment } from '@app/comments/entities/comment.entity';
import { Check, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('products')
@Check('rating >= 0 AND rating <= 5')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'smallint', default: 0 })
  rating: number;

  @Column({ type: 'double precision' })
  price: number;

  @OneToMany(
    () => Comment,
    comment => comment.product,
    { cascade: true }
  )
  comments: Comment[];
}