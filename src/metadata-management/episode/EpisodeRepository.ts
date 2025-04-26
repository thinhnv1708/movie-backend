import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { EpisodeEntity } from '../../postgre/entities/EpisodeEntity';
import { MovieEntity } from '../../postgre/entities/MovieEntity';
import { IEpisodeRepository } from './IEpisodeRepository';

@Injectable()
export class EpisodeRepository implements IEpisodeRepository {
  constructor(
    @Inject(EpisodeEntity)
    private readonly episodeRepository: Repository<EpisodeEntity>,
    @Inject(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  async getMovieById(id: string): Promise<{ id: string; slug: string }> {
    return this.movieRepository.findOne({
      where: { id },
      select: ['id', 'slug'],
    });
  }

  async create(data: {
    id: string;
    movieId: string;
    name: string;
    slug: string;
    source: string;
    order: number;
    duration: number;
    createdAt: number;
    updatedAt: number;
  }) {
    const episode = this.episodeRepository.create(data);
    await this.episodeRepository.save(episode);
    return episode;
  }

  async update(data: {
    id: string;
    movieId?: string;
    slug?: string;
    name?: string;
    source?: string;
    order?: number;
    duration?: number;
    updatedAt: number;
  }) {
    await this.episodeRepository.update({ id: data.id }, data);
    return this.getById(data.id);
  }

  async delete(id: string) {
    await this.episodeRepository.delete({ id });
  }

  async getById(id: string): Promise<{
    id: string;
    movieId: string;
    name: string;
    source: string;
    order: number;
    duration: number;
    createdAt: number;
    updatedAt: number;
  }> {
    const episode = await this.episodeRepository.findOne({ where: { id } });
    return episode;
  }

  async getByMovieIdAndOrder(
    movieId: string,
    order: number,
  ): Promise<EpisodeEntity> {
    return await this.episodeRepository.findOne({
      where: {
        movieId,
        order,
      },
    });
  }

  async getEpisodes(query: { movideId: string; order?: number }): Promise<{
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
  }> {
    const queryBuilder = this.episodeRepository.createQueryBuilder('episode');

    if (query.movideId) {
      queryBuilder.andWhere('episode.movie_id = :movieId', {
        movieId: query.movideId,
      });
    }

    if (query.order !== undefined) {
      queryBuilder.andWhere('episode.order = :order', { order: query.order });
    }

    const [episodes, total] = await queryBuilder.getManyAndCount();

    return {
      total,
      data: episodes,
    };
  }
}
