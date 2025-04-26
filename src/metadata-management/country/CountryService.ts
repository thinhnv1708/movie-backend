import { Inject, Injectable } from '@nestjs/common';
import BusinessError from '../../lib/BusinessError';
import idGenerator from '../../lib/idGenerator';
import StatusCode from '../../lib/StatusCode';
import getTimestampSeconds from '../../lib/utils/getTimestampSeconds';
import { slugify } from '../../lib/utils/slugify';
import { ICountryRepository } from './ICountryRepository';

@Injectable()
export class CountryService {
  constructor(
    @Inject('CountryRepo') private readonly countryRepo: ICountryRepository,
  ) {}

  async createCountry(data: {
    name: string;
  }) {
    const { name } = data;
    const slug = slugify(name);

    // Check if slug already exists
    const existingCountry = await this.countryRepo.getCountryBySlug(slug);
    if (existingCountry) {
      throw new BusinessError(StatusCode.COUNTRY_SLUG_EXISTS);
    }

    const now = getTimestampSeconds();
    const id = idGenerator();

    const country = await this.countryRepo.createCountry({
      id,
      name,
      slug,
      createdAt: now,
      updatedAt: now,
    });

    return country;
  }

  async updateCountry(
    countryId: string,
    data: {
      name?: string;
    },
  ) {
    const { name } = data;

    const country = await this.countryRepo.getCountry(countryId);
    if (!country) {
      throw new BusinessError(StatusCode.COUNTRY_NOT_FOUND);
    }

    const updateData: {
      id: string;
      name?: string;
      slug?: string;
      updatedAt: number;
    } = {
      id: countryId,
      updatedAt: getTimestampSeconds(),
    };

    if (name) {
      updateData.name = name;
      const slug = slugify(name);
      
      // Check if slug already exists and it's not this country
      const existingCountry = await this.countryRepo.getCountryBySlug(slug);
      if (existingCountry && existingCountry.id !== countryId) {
        throw new BusinessError(StatusCode.COUNTRY_SLUG_EXISTS);
      }
      
      updateData.slug = slug;
    }

    await this.countryRepo.updateCountry(updateData);

    return {
      id: countryId,
      name: name || country.name,
      slug: updateData.slug || country.slug,
      createdAt: country.createdAt,
      updatedAt: updateData.updatedAt,
    };
  }

  async deleteCountry(id: string) {
    const country = await this.countryRepo.getCountry(id);
    if (!country) {
      throw new BusinessError(StatusCode.COUNTRY_NOT_FOUND);
    }

    await this.countryRepo.deleteCountry(id);

    return country;
  }

  async listCountries(query: {
    page: number;
    limit: number;
    name?: string;
  }) {
    return this.countryRepo.listCountries(query);
  }

  async getDetailCountry(id: string) {
    const country = await this.countryRepo.getDetailCountry(id);
    if (!country) {
      throw new BusinessError(StatusCode.COUNTRY_NOT_FOUND);
    }

    return country;
  }
}