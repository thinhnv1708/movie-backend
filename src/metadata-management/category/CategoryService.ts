import { Inject, Injectable } from '@nestjs/common';
import BusinessError from '../../lib/BusinessError';
import idGenerator from '../../lib/idGenerator';
import StatusCode from '../../lib/StatusCode';
import getTimestampSeconds from '../../lib/utils/getTimestampSeconds';
import { slugify } from '../../lib/utils/slugify';
import { ICategoryRepository } from './ICategoryRepository';

@Injectable()
export class CategoryService {
  constructor(
    @Inject('CategoryRepo') private readonly categoryRepo: ICategoryRepository,
  ) {}

  async createCategory(data: {
    name: string;
  }) {
    const { name } = data;
    const slug = slugify(name);

    // Check if slug already exists
    const existingCategory = await this.categoryRepo.getCategoryBySlug(slug);
    if (existingCategory) {
      throw new BusinessError(StatusCode.CATEGORY_SLUG_EXISTS);
    }

    const now = getTimestampSeconds();
    const id = idGenerator();

    const category = await this.categoryRepo.createCategory({
      id,
      name,
      slug,
      createdAt: now,
      updatedAt: now,
    });

    return category;
  }

  async updateCategory(
    categoryId: string,
    data: {
      name?: string;
    },
  ) {
    const { name } = data;

    const category = await this.categoryRepo.getCategory(categoryId);
    if (!category) {
      throw new BusinessError(StatusCode.CATEGORY_NOT_FOUND);
    }

    const updateData: {
      id: string;
      name?: string;
      slug?: string;
      updatedAt: number;
    } = {
      id: categoryId,
      updatedAt: getTimestampSeconds(),
    };

    if (name) {
      updateData.name = name;
      const slug = slugify(name);
      
      // Check if slug already exists and it's not this category
      const existingCategory = await this.categoryRepo.getCategoryBySlug(slug);
      if (existingCategory && existingCategory.id !== categoryId) {
        throw new BusinessError(StatusCode.CATEGORY_SLUG_EXISTS);
      }
      
      updateData.slug = slug;
    }

    await this.categoryRepo.updateCategory(updateData);

    return {
      id: categoryId,
      name: name || category.name,
      slug: updateData.slug || category.slug,
      createdAt: category.createdAt,
      updatedAt: updateData.updatedAt,
    };
  }

  async deleteCategory(id: string) {
    const category = await this.categoryRepo.getCategory(id);
    if (!category) {
      throw new BusinessError(StatusCode.CATEGORY_NOT_FOUND);
    }

    await this.categoryRepo.deleteCategory(id);

    return category;
  }

  async listCategories(query: {
    page: number;
    limit: number;
    name?: string;
  }) {
    return this.categoryRepo.listCategories(query);
  }

  async getDetailCategory(id: string) {
    const category = await this.categoryRepo.getDetailCategory(id);
    if (!category) {
      throw new BusinessError(StatusCode.CATEGORY_NOT_FOUND);
    }

    return category;
  }
}