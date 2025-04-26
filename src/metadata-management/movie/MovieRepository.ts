import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { MovieEntity } from '../../postgre/entities/MovieEntity';
import { IMovieRepository } from './IMovieRepository';
import { MovieCategoryEntity } from '../../postgre/entities/MovieCategoryEntity';
import { removeUndefined } from '../../lib/utils/removeUndefined';
import { getSkip } from '../../lib/utils/getSkip';

@Injectable()
export class MovieRepository implements IMovieRepository {
  constructor(
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
    @Inject(MovieEntity)
    private readonly movieModel: Repository<MovieEntity>,
  ) {}

  async getMovie(id: string): Promise<{
    id: string;
    name: string;
    description: string;
    slug: string;
    originName: string;
    poster: string;
    thumbnail: string;
    trailer: string;
    source: string;
    duration: number;
    isActive: boolean;
    isSingle: boolean;
    categories: { id: string; name: string; slug: string }[];
    country: { id: string; name: string; slug: string };
    currentEpisode: number;
    totalEpisode: number;
    createdAt: number;
    updatedAt: number;
  }> {
    const movie = await this.movieModel.findOne({
      where: { id },
      relations: ['categories', 'country'],
    });

    if (!movie) {
      return null;
    }

    return {
      id: movie.id,
      name: movie.name,
      description: movie.description,
      slug: movie.slug,
      originName: movie.originName,
      poster: movie.poster,
      thumbnail: movie.thumbnail,
      trailer: movie.trailer,
      source: movie.source,
      duration: movie.duration,
      isActive: movie.isActive,
      isSingle: movie.isSingle,
      categories: movie.categories.map((category) => ({
        id: category.id,
        name: category.name,
        slug: movie.slug,
      })),
      country: {
        id: movie.country.id,
        name: movie.country.name,
        slug: movie.country.slug,
      },
      currentEpisode: movie.currentEpisode,
      totalEpisode: movie.totalEpisode,
      createdAt: movie.createdAt,
      updatedAt: movie.updatedAt,
    };
  }

  async createMovie(data: {
    id: string;
    name: string;
    description: string;
    slug: string;
    originName: string;
    poster: string;
    thumbnail: string;
    trailer: string;
    source: string;
    duration: number;
    isActive: boolean;
    isSingle: boolean;
    categoryIds: string[];
    countryId: string;
    currentEpisode: number;
    totalEpisode: number;
    createdAt: number;
    updatedAt: number;
  }): Promise<void> {
    const {
      id,
      name,
      description,
      slug,
      originName,
      poster,
      thumbnail,
      trailer,
      source,
      duration,
      isActive,
      isSingle,
      categoryIds,
      countryId,
      currentEpisode,
      totalEpisode,
      createdAt,
      updatedAt,
    } = data;

    await this.dataSource.transaction(async (transactionalEntityManager) => {
      const movieModel = transactionalEntityManager.getRepository(MovieEntity);
      const movieCategory =
        transactionalEntityManager.getMongoRepository(MovieCategoryEntity);

      await movieModel.insert(
        removeUndefined({
          id,
          name,
          description,
          slug,
          originName,
          poster,
          thumbnail,
          trailer,
          source,
          duration,
          isActive,
          isSingle,
          countryId,
          currentEpisode,
          totalEpisode,
          createdAt,
          updatedAt,
        }),
      );

      if (categoryIds.length > 0) {
        await movieCategory.insertMany(
          categoryIds.map((categoryId) => ({ movieId: id, categoryId })),
        );
      }
    });
  }

  async updateMovie(data: {
    id: string;
    name?: string;
    description?: string;
    slug?: string;
    originName?: string;
    poster?: string;
    thumbnail?: string;
    trailer?: string;
    source?: string;
    duration?: number;
    isActive?: boolean;
    isSingle?: boolean;
    categoryIds?: string[];
    countryId?: string;
    currentEpisode?: number;
    totalEpisode?: number;
    updatedAt: number;
  }): Promise<void> {
    const {
      id,
      name,
      description,
      slug,
      originName,
      poster,
      thumbnail,
      trailer,
      source,
      duration,
      isActive,
      isSingle,
      categoryIds,
      countryId,
      currentEpisode,
      totalEpisode,
      updatedAt,
    } = data;

    await this.dataSource.transaction(async (transactionalEntityManager) => {
      const movieModel = transactionalEntityManager.getRepository(MovieEntity);
      const movieCategory =
        transactionalEntityManager.getMongoRepository(MovieCategoryEntity);

      await movieModel.update(
        { id },
        removeUndefined({
          name,
          description,
          slug,
          originName,
          poster,
          thumbnail,
          trailer,
          source,
          duration,
          isActive,
          isSingle,
          categoryIds,
          countryId,
          currentEpisode,
          totalEpisode,
          updatedAt,
        }),
      );

      if (categoryIds) {
        await movieCategory.deleteMany({
          movieId: id,
        });

        if (categoryIds.length > 0) {
          await movieCategory.insertMany(
            categoryIds.map((categoryId) => ({ movieId: id, categoryId })),
          );
        }
      }
    });
  }

  async deleteMovie(id: string): Promise<void> {
    await this.movieModel.delete(id);
  }

  async listMovies(query: {
    page: number;
    limit: number;
    isActive?: boolean;
    isSingle?: boolean;
    categoryId?: string;
    countryId?: string;
  }): Promise<{
    total: number;
    items: {
      id: string;
      name: string;
      description: string;
      slug: string;
      originName: string;
      poster: string;
      thumbnail: string;
      trailer: string;
      source: string;
      duration: number;
      isActive: boolean;
      isSingle: boolean;
      categories: { id: string; name: string; slug: string }[];
      country: { id: string; name: string; slug: string };
      currentEpisode: number;
      totalEpisode: number;
      createdAt: number;
      updatedAt: number;
    }[];
  }> {
    const { page, limit, isActive, isSingle, categoryId, countryId } = query;
    const skip = getSkip(page, limit);

    const where: any = {};

    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    if (isSingle !== undefined) {
      where.isSingle = isSingle;
    }

    if (countryId) {
      where.countryId = countryId;
    }

    const [movies, total] = await this.movieModel.findAndCount({
      where,
      relations: ['categories', 'country'],
      skip,
      take: limit,
      order: { updatedAt: 'DESC' },
    });

    return {
      total,
      items: movies.map((movie) => {
        return {
          id: movie.id,
          name: movie.name,
          description: movie.description,
          slug: movie.slug,
          originName: movie.originName,
          poster: movie.poster,
          thumbnail: movie.thumbnail,
          trailer: movie.trailer,
          source: movie.source,
          duration: movie.duration,
          isActive: movie.isActive,
          isSingle: movie.isSingle,
          categories: movie.categories.map((category) => ({
            id: category.id,
            name: category.name,
            slug: category.slug,
          })),
          country: {
            id: movie.country.id,
            name: movie.country.name,
            slug: movie.country.slug,
          },
          currentEpisode: movie.currentEpisode,
          totalEpisode: movie.totalEpisode,
          createdAt: movie.createdAt,
          updatedAt: movie.updatedAt,
        };
      }),
    };
  }

  async getDetailMovie(id: string): Promise<{
    id: string;
    name: string;
    description: string;
    slug: string;
    originName: string;
    poster: string;
    thumbnail: string;
    trailer: string;
    source: string;
    duration: number;
    isActive: boolean;
    isSingle: boolean;
    categories: { id: string; name: string; slug: string }[];
    country: { id: string; name: string; slug: string };
    currentEpisode: number;
    totalEpisode: number;
    createdAt: number;
    updatedAt: number;
  }> {
    const movie = await this.movieModel.findOne({
      where: { id },
      relations: ['genre', 'country'],
    });

    if (!movie) {
      return null;
    }

    return {
      id: movie.id,
      name: movie.name,
      description: movie.description,
      slug: movie.slug,
      originName: movie.originName,
      poster: movie.poster,
      thumbnail: movie.thumbnail,
      trailer: movie.trailer,
      source: movie.source,
      duration: movie.duration,
      isActive: movie.isActive,
      isSingle: movie.isSingle,
      categories: movie.categories.map((category) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
      })),
      country: {
        id: movie.country.id,
        name: movie.country.name,
        slug: movie.country.slug,
      },
      currentEpisode: movie.currentEpisode,
      totalEpisode: movie.totalEpisode,
      createdAt: movie.createdAt,
      updatedAt: movie.updatedAt,
    };
  }

  async getMovieBySlug(slug: string): Promise<{
    id: string;
    name: string;
    description: string;
    slug: string;
    originName: string;
    poster: string;
    thumbnail: string;
    trailer: string;
    source: string;
    duration: number;
    isActive: boolean;
    isSingle: boolean;
    categories: { id: string; name: string }[];
    country: { id: string; name: string };
    currentEpisode: number;
    totalEpisode: number;
    createdAt: number;
    updatedAt: number;
  }> {
    const movie = await this.movieModel.findOne({
      where: { slug },
      relations: ['genre', 'country'],
    });

    if (!movie) {
      return null;
    }

    return {
      id: movie.id,
      name: movie.name,
      description: movie.description,
      slug: movie.slug,
      originName: movie.originName,
      poster: movie.poster,
      thumbnail: movie.thumbnail,
      trailer: movie.trailer,
      source: movie.source,
      duration: movie.duration,
      isActive: movie.isActive,
      isSingle: movie.isSingle,
      categories: movie.categories.map((category) => ({
        id: category.id,
        name: category.name,
      })),
      country: {
        id: movie.country.id,
        name: movie.country.name,
      },
      currentEpisode: movie.currentEpisode,
      totalEpisode: movie.totalEpisode,
      createdAt: movie.createdAt,
      updatedAt: movie.updatedAt,
    };
  }
}
