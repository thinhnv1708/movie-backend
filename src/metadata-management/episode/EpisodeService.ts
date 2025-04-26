import { Inject, Injectable } from '@nestjs/common';
import BusinessError from '../../lib/BusinessError';
import StatusCode from '../../lib/StatusCode';
import idGenerator from '../../lib/idGenerator';
import getTimestampSeconds from '../../lib/utils/getTimestampSeconds';
import { IEpisodeRepository } from './IEpisodeRepository';

@Injectable()
export class EpisodeService {
  constructor(
    @Inject('EpisodeRepo')
    private readonly episodeRepository: IEpisodeRepository,
  ) {}

  async createEpisode(createEpisodeDto: {
    movieId: string;
    name: string;
    order: number;
    source: string;
    duration: number;
  }) {
    const { movieId, name, source, order, duration } = createEpisodeDto;

    // Check if movie exists
    const movie = await this.episodeRepository.getMovieById(movieId);
    if (!movie) {
      throw new BusinessError(StatusCode.MOVIE_NOT_FOUND);
    }

    const slug = `${movie.slug}-${order}`;

    // Check if episode with the same order already exists for this movie
    const existingEpisode = await this.episodeRepository.getByMovieIdAndOrder(
      movieId,
      order,
    );

    if (existingEpisode) {
      throw new BusinessError(StatusCode.EPISODE_ORDER_EXISTS);
    }

    const now = Date.now();
    const id = idGenerator();

    return this.episodeRepository.create({
      id,
      movieId,
      name,
      slug,
      source,
      order,
      duration,
      createdAt: now,
      updatedAt: now,
    });
  }

  async updateEpisode(
    id: string,
    data: {
      name?: string;
      order?: number;
      source?: string;
      duration?: number;
    },
  ) {
    const { name, order, source, duration } = data;
    const episode = await this.episodeRepository.getById(id);

    if (!episode) {
      throw new BusinessError(StatusCode.EPISODE_NOT_FOUND);
    }

    let newSlug: string;

    // If order is being updated, check for conflicts
    if (order) {
      const existingEpisode = await this.episodeRepository.getByMovieIdAndOrder(
        episode.movieId,
        order,
      );

      if (existingEpisode && existingEpisode.id !== id) {
        throw new BusinessError(StatusCode.EPISODE_ORDER_EXISTS);
      }

      const movie = await this.episodeRepository.getMovieById(episode.movieId);

      if (!movie) {
        throw new BusinessError(StatusCode.MOVIE_NOT_FOUND);
      }

      newSlug = `${movie.slug}-${data.order}`;
    }

    const updatedEpisode = await this.episodeRepository.update({
      id,
      name,
      order,
      source,
      duration,
      slug: newSlug,
      updatedAt: getTimestampSeconds(),
    });

    return updatedEpisode;
  }

  async deleteEpisode(id: string) {
    const episode = await this.episodeRepository.getById(id);
    if (!episode) {
      throw new BusinessError(StatusCode.EPISODE_NOT_FOUND);
    }

    await this.episodeRepository.delete(id);
    return { success: true };
  }

  async getEpisodeById(id: string) {
    const episode = await this.episodeRepository.getById(id);
    if (!episode) {
      throw new BusinessError(StatusCode.EPISODE_NOT_FOUND);
    }

    return episode;
  }

  async getEpisodesByMovieId(movieId: string, order?: number) {
    // Check if movie exists
    const movie = await this.episodeRepository.getMovieById(movieId);
    if (!movie) {
      throw new BusinessError(StatusCode.MOVIE_NOT_FOUND);
    }

    return this.episodeRepository.getEpisodes({
      movideId: movieId,
      order,
    });
  }
}
