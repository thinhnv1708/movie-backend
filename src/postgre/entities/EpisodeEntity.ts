import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, Unique } from 'typeorm';
import { MovieEntity } from './MovieEntity';

@Entity({
  name: 'episode',
})
@Unique(['movieId', 'order'])
export class EpisodeEntity {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'movie_id' })
  movieId: string;

  @ManyToOne(() => MovieEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'movie_id' })
  movie: MovieEntity;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  order: number;

  @Column({ nullable: true })
  source: string;

  @Column()
  duration: number;

  @Column({ name: 'created_at' })
  createdAt: number;

  @Column({ name: 'updated_at' })
  updatedAt: number;
}