
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'movie_metadata',
})
export class MovieMetadataEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  originalTitle: string;

  @Column({ nullable: true })
  overview: string;

  @Column({ nullable: true })
  posterPath: string;

  @Column({ nullable: true })
  backdropPath: string;

  @Column({ type: 'simple-array', nullable: true })
  genres: string[];

  @Column({ nullable: true })
  runtime: number;

  @Column({ type: 'decimal', precision: 3, scale: 1, nullable: true })
  rating: number;

  @Column({ type: 'date', nullable: true })
  releaseDate: Date;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  language: string;

  @Column({ type: 'simple-array', nullable: true })
  productionCountries: string[];

  @Column({ nullable: true })
  director: string;

  @Column({ type: 'simple-array', nullable: true })
  cast: string[];

  @Column({ name: 'created_at' })
  createdAt: number;

  @Column({ name: 'updated_at' })
  updatedAt: number;
}