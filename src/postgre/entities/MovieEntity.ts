import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { CategoryEntity } from './CategoryEntity';
import { CountryEntity } from './CountryEntity';

@Entity({
  name: 'movie',
})
export class MovieEntity {
  @PrimaryColumn()
  id: string;

  @Column({ name: 'is_single' })
  isSingle: boolean;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column({ name: 'origin_name' })
  originName: string;

  @Column({ nullable: true })
  description: string;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @Column({ nullable: true })
  poster: string;

  @Column({ nullable: true })
  thumbnail: string;

  @Column({ nullable: true })
  duration: number;

  @Column({ nullable: true })
  trailer: string;

  @Column({ nullable: true })
  source: string;

  @Column({ name: 'current_episode' })
  currentEpisode: number;

  @Column({ name: 'total_episode' })
  totalEpisode: number;

  @Column({ name: 'country_id' })
  countryId: string;

  @Column({ name: 'created_at' })
  createdAt: number;

  @Column({ name: 'updated_at' })
  updatedAt: number;

  @ManyToMany(() => CategoryEntity, (cate) => cate.movies)
  @JoinTable({
    name: 'movie_category',
    joinColumn: {
      name: 'movie_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
  })
  categories: CategoryEntity[];

  @ManyToOne(() => CountryEntity)
  @JoinColumn({ name: 'country_id' })
  country: CountryEntity;
}
