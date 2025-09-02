import { Product } from '@app/products/entities/product.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  authorName: string;

  @Column({ type: 'int', default: 0, unsigned: true })
  likes: number;

  @Column({ type: 'int', default: 0, unsigned: true })
  dislikes: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => Product, (product: Product) => product.comments)
  product: Product;
}