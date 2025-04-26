import { Inject, Injectable } from '@nestjs/common';
import BusinessError from '../../lib/BusinessError';
import StatusCode from '../../lib/StatusCode';
import idGenerator from '../../lib/idGenerator';
import { IMovieRepository } from './IMovieRepository';
import getTimestampSeconds from '../../lib/utils/getTimestampSeconds';

// Movie creation interface
interface CreateMovieParams {
  name: string;
  slug: string;
  isSingle: boolean;
  isActive: boolean;
  originName?: string;
  description?: string;
  categoryIds?: string[];
  poster?: string;
  thumbnail?: string;
  duration?: number;
  trailer?: string;
  source?: string;
  currentEpisode?: number;
  totalEpisode?: number;
  countryId?: string;
}

// Movie update interface
interface UpdateMovieParams {
  name?: string;
  slug?: string;
  isSingle?: boolean;
  isActive?: boolean;
  originName?: string;
  description?: string;
  categoryIds?: string[];
  poster?: string;
  thumbnail?: string;
  duration?: number;
  trailer?: string;
  source?: string;
  currentEpisode?: number;
  totalEpisode?: number;
  countryId?: string;
}

@Injectable()
export class MovieService {
  constructor(
    @Inject('MovieRepo')
    private readonly movieRepository: IMovieRepository,
  ) {}

  async createMovie(data: CreateMovieParams) {
    const existingMovie = await this.movieRepository.getMovieBySlug(data.slug);
    if (existingMovie) {
      throw new BusinessError(StatusCode.MOVIE_SLUG_EXISTS);
    }

    const id = idGenerator();
    const now = getTimestampSeconds();
    await this.movieRepository.createMovie({
      id,
      name: data.name,
      description: data.description || '',
      slug: data.slug,
      originName: data.originName || '',
      poster: data.poster || '',
      thumbnail: data.thumbnail || '',
      trailer: data.trailer || '',
      source: data.source || '',
      duration: data.duration || 0,
      isActive: data.isActive,
      isSingle: data.isSingle,
      categoryIds: data.categoryIds,
      countryId: data.countryId,
      currentEpisode: data.currentEpisode || 0,
      totalEpisode: data.totalEpisode || 0,
      createdAt: now,
      updatedAt: now,
    });

    return {
      id,
    };
  }

  async updateMovie(id: string, data: UpdateMovieParams) {
    const movie = await this.movieRepository.getMovie(id);
    if (!movie) {
      throw new BusinessError(StatusCode.MOVIE_NOT_FOUND);
    }

    if (data.slug && data.slug !== movie.slug) {
      const existingWithSlug = await this.movieRepository.getMovieBySlug(
        data.slug,
      );
      if (existingWithSlug && existingWithSlug.id !== id) {
        throw new BusinessError(StatusCode.MOVIE_SLUG_EXISTS);
      }
    }

    await this.movieRepository.updateMovie({
      id,
      name: data.name,
      description: data.description,
      slug: data.slug,
      originName: data.originName,
      poster: data.poster,
      thumbnail: data.thumbnail,
      trailer: data.trailer,
      source: data.source,
      duration: data.duration,
      isActive: data.isActive,
      isSingle: data.isSingle,
      categoryIds: data.categoryIds,
      countryId: data.countryId,
      currentEpisode: data.currentEpisode,
      totalEpisode: data.totalEpisode,
      updatedAt: Date.now(),
    });

    return {
      id: movie.id,
    };
  }

  async deleteMovie(id: string) {
    const movie = await this.movieRepository.getMovie(id);
    if (!movie) {
      throw new BusinessError(StatusCode.MOVIE_NOT_FOUND);
    }
    await this.movieRepository.deleteMovie(id);
    return {
      id,
    };
  }

  async getMovieById(id: string) {
    const movie = await this.movieRepository.getDetailMovie(id);
    if (!movie) {
      throw new BusinessError(StatusCode.MOVIE_NOT_FOUND);
    }
    return movie;
  }

  async getMovieBySlug(slug: string) {
    const movie = await this.movieRepository.getMovieBySlug(slug);
    if (!movie) {
      throw new BusinessError(StatusCode.MOVIE_NOT_FOUND);
    }
    return movie;
  }

  async getMovies(query: {
    page: number;
    limit: number;
    isActive?: boolean;
    isSingle?: boolean;
    categoryIds?: string[];
    countryId?: string;
  }) {
    const { page, limit, isActive, isSingle, categoryIds, countryId } = query;

    const result = await this.movieRepository.listMovies({
      page,
      limit,
      isActive,
      isSingle,
      categoryIds,
      countryId,
    });

    return {
      total: result.total,
      items: result.items,
    };
  }
}
