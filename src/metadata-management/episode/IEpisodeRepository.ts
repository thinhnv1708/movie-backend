import { EpisodeEntity } from '../../postgre/entities/EpisodeEntity';

export interface IEpisodeRepository {
  // for check movie exists
  getMovieById(id: string): Promise<{ id: string, slug: string }>;

  create(data: {
    id: string;
    movieId: string;
    name: string;
    slug: string;
    source: string;
    order: number;
    duration: number;
    createdAt: number;
    updatedAt: number;
  });
  update(data: {
    id: string;
    movieId?: string;
    slug?: string;
    name?: string;
    source?: string;
    order?: number;
    duration?: number;
    updatedAt: number;
  });
  delete(id: string);
  getById(id: string): Promise<{
    id: string;
    movieId: string;
    name: string;
    source: string;
    order: number;
    duration: number;
    createdAt: number;
    updatedAt: number;
  }>;
  getByMovieIdAndOrder(movieId: string, order: number): Promise<EpisodeEntity>;
  getEpisodes(query: { movideId: string; order?: number }): Promise<{
    total: number;
    data: {
      id: string;
      movieId: string;
      name: string;
      slug: string;
      source: string;
      order: number;
      duration: number;
      createdAt: number;
      updatedAt: number;
    }[];
  }>;
}
