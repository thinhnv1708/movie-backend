import { Inject, Injectable } from '@nestjs/common';
import { DataSource, Like, Repository } from 'typeorm';
import { CountryEntity } from '../../postgre/entities/CountryEntity';
import { ICountryRepository } from './ICountryRepository';
import { getSkip } from '../../lib/utils/getSkip';

@Injectable()
export class CountryRepository implements ICountryRepository {
  constructor(
    @Inject('DATA_SOURCE')
    private dataSource: DataSource,
    @Inject(CountryEntity)
    private countryModel: Repository<CountryEntity>,
  ) {}

  async getCountry(id: string): Promise<{
    id: string;
    name: string;
    slug: string;
    createdAt: number;
    updatedAt: number;
  }> {
    return this.countryModel.findOne({ where: { id } });
  }

  async createCountry(data: {
    id: string;
    name: string;
    slug: string;
    createdAt: number;
    updatedAt: number;
  }): Promise<void> {
    const { id, name, slug, createdAt, updatedAt } = data;

    await this.countryModel.insert({
      id,
      name,
      slug,
      createdAt,
      updatedAt,
    });
  }

  async updateCountry(data: {
    id: string;
    name?: string;
    slug?: string;
    updatedAt: number;
  }): Promise<void> {
    const { id, name, slug, updatedAt } = data;

    await this.countryModel.update(
      { id },
      {
        ...(name && { name }),
        ...(slug && { slug }),
        updatedAt,
      },
    );
  }

  async deleteCountry(id: string): Promise<void> {
    await this.countryModel.delete({ id });
  }

  async listCountries(query: {
    page: number;
    limit: number;
    name?: string;
  }): Promise<{
    total: number;
    items: {
      id: string;
      name: string;
      slug: string;
      createdAt: number;
      updatedAt: number;
    }[];
  }> {
    const { page, limit, name } = query;
    const skip = getSkip(page, limit);

    const where = {};
    if (name) {
      where['name'] = Like(`%${name}%`);
    }

    const [items, total] = await this.countryModel.findAndCount({
      where,
      skip,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    });

    return {
      total,
      items,
    };
  }

  async getDetailCountry(id: string): Promise<{
    id: string;
    name: string;
    slug: string;
    createdAt: number;
    updatedAt: number;
  }> {
    return this.countryModel.findOne({ where: { id } });
  }

  async getCountryBySlug(slug: string): Promise<{
    id: string;
    name: string;
    slug: string;
    createdAt: number;
    updatedAt: number;
  }> {
    return this.countryModel.findOne({ where: { slug } });
  }
}