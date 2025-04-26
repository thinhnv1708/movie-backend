import { Inject, Injectable } from '@nestjs/common';
import { Like, Repository } from 'typeorm';
import { getSkip } from '../../lib/utils/getSkip';
import { CategoryEntity } from '../../postgre/entities/CategoryEntity';
import { ICategoryRepository } from './ICategoryRepository';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(
    @Inject(CategoryEntity)
    private categoryModel: Repository<CategoryEntity>,
  ) {}

  async getCategory(id: string): Promise<{
    id: string;
    name: string;
    slug: string;
    createdAt: number;
    updatedAt: number;
  }> {
    return this.categoryModel.findOne({ where: { id } });
  }

  async createCategory(data: {
    id: string;
    name: string;
    slug: string;
    createdAt: number;
    updatedAt: number;
  }): Promise<void> {
    const { id, name, slug, createdAt, updatedAt } = data;

    await this.categoryModel.insert({
      id,
      name,
      slug,
      createdAt,
      updatedAt,
    });
  }

  async updateCategory(data: {
    id: string;
    name?: string;
    slug?: string;
    updatedAt: number;
  }): Promise<void> {
    const { id, name, slug, updatedAt } = data;

    await this.categoryModel.update(
      { id },
      {
        ...(name && { name }),
        ...(slug && { slug }),
        updatedAt,
      },
    );
  }

  async deleteCategory(id: string): Promise<void> {
    await this.categoryModel.delete({ id });
  }

  async listCategories(query: {
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

    const [items, total] = await this.categoryModel.findAndCount({
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

  async getDetailCategory(id: string): Promise<{
    id: string;
    name: string;
    slug: string;
    createdAt: number;
    updatedAt: number;
  }> {
    return this.categoryModel.findOne({ where: { id } });
  }

  async getCategoryBySlug(slug: string): Promise<{
    id: string;
    name: string;
    slug: string;
    createdAt: number;
    updatedAt: number;
  }> {
    return this.categoryModel.findOne({ where: { slug } });
  }
}
