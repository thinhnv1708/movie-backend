import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { MovieEntity } from './MovieEntity';

@Entity({
  name: 'category',
})
export class CategoryEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ name: 'created_at' })
  createdAt: number;

  @Column({ name: 'updated_at' })
  updatedAt: number;

  @ManyToMany(() => MovieEntity, (movie) => movie.categories)
  movies: MovieEntity[];
}
