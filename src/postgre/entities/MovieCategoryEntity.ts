import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { CategoryEntity } from './CategoryEntity';
import { MovieEntity } from './MovieEntity';

@Entity({
  name: 'movie_category',
})
export class MovieCategoryEntity {
  @PrimaryColumn({ name: 'movie_id' })
  movieId: string;

  @PrimaryColumn({ name: 'category_id' })
  categoryId: string;

  @ManyToOne(() => MovieEntity)
  @JoinColumn({ name: 'movie_id' })
  movie: MovieEntity;

  @ManyToOne(() => CategoryEntity)
  @JoinColumn({ name: 'category_id' })
  category: CategoryEntity;
}
